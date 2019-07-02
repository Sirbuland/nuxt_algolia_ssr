/* eslint-disable import/no-commonjs */

module.exports = {
  build: {
    transpile: ["vue-instantsearch", "instantsearch.js/es"]
  },
  router: {
    parseQuery(query) {
      // eslint-disable-next-line
      return require("qs").parse(query);
    },
    stringifyQuery(query) {
      // eslint-disable-next-line
      const stringified = require("qs").stringify(query);
      return stringified ? `?${stringified}` : "";
    }
  }
};
