const mysqldump = require("mysqldump");
require("dotenv").config();
const { parseUri } = require("mysql-parse");

const DUMP_PRODUCTION = process.argv.indexOf("--dump-production") !== -1;

let config;

if (DUMP_PRODUCTION) {
  config = parseUri(process.env.DATABASE_URL_PRODUCTION);
} else {
  config = parseUri(process.env.DATABASE_URL);
}

mysqldump({
  connection: {
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
  },
  dumpToFile: "./init.sql",
});
