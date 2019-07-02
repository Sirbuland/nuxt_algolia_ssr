/* eslint-disable import/no-commonjs */
require('dotenv').config()

export default {
  mode: 'universal',
  build: {
    transpile: ["vue-instantsearch", "instantsearch.js/es"]
  },
  plugins: [
    { src: '~/plugins/instantSearch'},
    { src: '~/plugins/vuetify' }
  ],
  env: {
    vueAppAlgoliaAppId: process.env.VUE_APP_ALGOLIA_APP_ID,
    vueAppAlgoliaApiKey: process.env.VUE_APP_ALGOLIA_API_KEY,
    vueAppAlgoliaIndexName: process.env.VUE_APP_ALGOLIA_INDEX_NAME,
  },
  modules: [
    ['@nuxtjs/dotenv'],
  ],
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
