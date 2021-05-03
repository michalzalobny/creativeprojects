"use strict";

const { exec } = require("child_process");

/**
 * dump-db.js controller
 *
 * @description: A set of functions called "actions" of the `dump-db` plugin.
 */

module.exports = {
  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    exec("npm run dump-db", (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    ctx.send({
      ok: true,
    });
  },
};
