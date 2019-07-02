<template>
  <ais-instant-search-ssr>
    <div>
      <div id="nav">
        <nuxt-link to="/">Home</nuxt-link> |
        <nuxt-link to="/search">Search</nuxt-link>
      </div>
      <nuxt />
    </div>
  </ais-instant-search-ssr>
</template>


<script>
  import { AisInstantSearchSsr } from 'vue-instantsearch';
  export default {
    components: {
      AisInstantSearchSsr
    },
    provide() {
      return {
        // It was provided by the `rootMixin` but it's not possible to have access
        // to it anymore. That's why we have to provide it manually. The plugin
        // is in charge of exposing `$instantsearch` on the App instance.
        $_ais: this.$instantsearch
      };
    },
    asyncData(context) {
      const uiState = context.route.query || {};
      const query = uiState.query || '';
      const page = uiState.page - 1 || 0;
      const disjunctiveFacets = ['preis', 'hersteller', 'productCondition_de', 'serviceType_de'];
      const $instantsearch = context.app.$instantsearch;

      const disjunctiveFacetsRefinements = disjunctiveFacets.reduce(
        (acc, key) => ({
          [key]: (uiState.refinementList && uiState.refinementList[key]) || [],
        }),
        {}
      );

      return $instantsearch.findResultsState({
          query,
          page,
          disjunctiveFacets: ['preis', 'hersteller', 'productCondition_de', 'serviceType_de']
        })
        .then(() => ({
          instantSearchState: $instantsearch.getState(),
        }));
    },
    data() {
      return {
        instantsearch: this.$instantsearch,
      }
    },
    beforeMount() {
      this.instantsearch.hydrate(this.instantSearchState);
    }
  }
</script>
<style>

html {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}

#nav {
  text-align: center;
}
a {
  color: #250098 !important;
  cursor: pointer;
}
</style>
