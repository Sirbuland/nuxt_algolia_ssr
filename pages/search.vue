<template>
  <div>
    <ais-search-box />
    <ais-stats />
    <ais-refinement-list attribute="hersteller" />
    <ais-hits>
      <template slot="item" slot-scope="{ item }">
        <p>
        </p>
        <p>
        </p>
      </template>
    </ais-hits>
    <ais-pagination />
  </div>
</template>

<script>
import {
  AisInstantSearchSsr,
  AisRefinementList,
  AisHits,
  AisHighlight,
  AisSearchBox,
  AisStats,
  AisPagination,
  createInstantSearch,
  // for some reason eslint doesn't recognise this dependency, while it's in package.json
  // eslint-disable-next-line import/no-unresolved
} from 'vue-instantsearch';
import algoliasearch from 'algoliasearch/lite';
import { simple as simpleStateMapping } from 'instantsearch.js/es/lib/stateMappings';
import { history as historyRouter } from 'instantsearch.js/es/lib/routers';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const { instantsearch, rootMixin } = createInstantSearch({
  searchClient,
  indexName: 'instant_search',
  routing: {
    stateMapping: simpleStateMapping(),
    router: historyRouter(),
  },
});

export default {
  asyncData(context) {
    // On the server you have to manually map the `query` to
    // the `SearchParameters`. Otherwise on the first render
    // the search is out of sync.

    const uiState = context.route.query || {};
    const query = uiState.query || '';
    const page = uiState.page - 1 || 0;
    const disjunctiveFacets = ['brand'];
    const disjunctiveFacetsRefinements = disjunctiveFacets.reduce(
      (acc, key) => ({
        [key]: (uiState.refinementList && uiState.refinementList[key]) || [],
      }),
      {}
    );

    return instantsearch
      .findResultsState({
        // Translate `context.route.query` into `SearchParameters`
        // You can use `ais-state-results` to find which parameters
        // is applied when.
        query,
        page,
        disjunctiveFacets,
        disjunctiveFacetsRefinements,
      })
      .then(() => ({
        algoliaState: instantsearch.getState(),
      }));
  },
  beforeMount() {
    // Nuxt will merge `asyncData` and `data` on the client
    instantsearch.hydrate(this.algoliaState);
  },
  mixins: [rootMixin],
  components: {
    AisInstantSearchSsr,
    AisRefinementList,
    AisHits,
    AisHighlight,
    AisSearchBox,
    AisStats,
    AisPagination,
  },
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href:
            'https://unpkg.com/instantsearch.css@7.1.0/themes/algolia-min.css',
        },
      ],
    };
  },
};
</script>

<style>
.ais-Hits-list {
  text-align: left;
}
.ais-InstantSearch {
  margin: 1em;
}
</style>
