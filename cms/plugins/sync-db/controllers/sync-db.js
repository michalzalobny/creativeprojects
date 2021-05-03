"use strict";

const { exec } = require("child_process");

/**
 * sync-db.js controller
 *
 * @description: A set of functions called "actions" of the `sync-db` plugin.
 */

module.exports = {
  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    exec("npm run sync-db", (err, stdout, stderr) => {
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
