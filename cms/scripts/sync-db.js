const fs = require("fs");
const path = require("path");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const { exec } = require("child_process");

require("dotenv").config();
const { parseUri } = require("mysql-parse");

const config = parseUri(process.env.DATABASE_URL);

const connectionConfig = {
  host: config.host,
  port: config.port,
  user: config.user,
  password: config.password,
  database: config.database,
  multipleStatements: true,
  acquireTimeout: 30000,
  connectTimeout: 30000,
};

const INITIAL_ONLY = process.argv.indexOf("--initial-only") !== -1;

const connection = mysql.createConnection(connectionConfig);

connection.connect();

// If initial only, ensure that the database does not exist or is empty
if (INITIAL_ONLY) {
  connection.query(
    { sql: "select * from strapi_administrator", timeout: 15000 },
    function (error, results) {
      if (error || results.length === 0) {
        // No admin user, i.e. first run.
        main();
      } else {
        console.log("Skipping DB initialization.");
        console.log("To run manually, run `npm run sync-db`");
        connection.end();
      }
    }
  );
} else {
  main();
}

function main() {
  // Remove all tables
  console.log("Disabling foreign key checks...");
  connection.query(
    { sql: "SET FOREIGN_KEY_CHECKS=0", timeout: 10000 },
    function (error) {
      if (error) {
        throw error;
      }

      console.log("Listing tables...");
      connection.query(
        { sql: "show tables", timeout: 15000 },
        function (error, results) {
          if (error) {
            throw error;
          }

          let key;
          let tableNames;

          if (results.length > 0) {
            key = Object.keys(results[0])[0];
            tableNames = results.map((row) => row[key]);
          }

          const dropStatement =
            results.length > 0
              ? `drop table ${tableNames
                  .map((name) => `\`${name}\``)
                  .join(",")}`
              : "select 1";

          console.log("Dropping tables...");
          connection.query(
            { sql: dropStatement, timeout: 60000 },
            function (error) {
              if (error) {
                throw error;
              }

              console.log("Re-enabling foreign key checks...");
              connection.query(
                { sql: "SET FOREIGN_KEY_CHECKS=1", timeout: 10000 },
                function (error) {
                  if (error) {
                    throw error;
                  }

                  console.log("Running init.sql...");

                  // Re-init the database
                  const statements = fs.readFileSync("./init.sql").toString();

                  connection.query(
                    { sql: statements, timeout: 5 * 60000 },
                    function (error) {
                      if (error) {
                        throw error;
                      }

                      console.log("Initializing DB complete");

                      console.log("Updating admin password");
                      const adminPassword =
                        process.env.CMS_ADMIN_PASSWORD || "Password1";
                      bcrypt.hash(adminPassword, 10).then((hash) => {
                        connection.query(
                          {
                            sql: `UPDATE strapi_administrator SET password='${hash}' WHERE username='root'`,
                            timeout: 5000,
                          },
                          function (error) {
                            if (error) {
                              throw error;
                            }

                            console.log("Admin password update success");

                            if (INITIAL_ONLY) {
                              // If this is the initial run, dump the database:
                              console.log("Dumping db");
                              exec("npm run dump-db", (err, stdout, stderr) => {
                                if (err) {
                                  console.error(err);
                                }
                                console.log("db dump success");
                              });
                              connection.end();
                            } else {
                              connection.end();
                            }
                          }
                        );
                      });
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
}
