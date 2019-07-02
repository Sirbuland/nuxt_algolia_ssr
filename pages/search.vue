<template>
  <div>
    <ais-search-box />
    <ais-stats />
    <ais-refinement-list attribute="kategorie" />
    <ais-refinement-list attribute="hersteller" />
    <ais-hits>
      <template slot="item" slot-scope="{ item }">
        <p>Titel: {{item.titel}}</p>
        <p>Description: {{item.beschreibung}}</p>
        <p>Kategorie: {{item.kategorie}}</p>
        <p>Hersteller: {{item.hersteller}}</p>
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


export default {
  asyncData(context) {
  },
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
