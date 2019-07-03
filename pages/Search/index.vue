<template>
  <div>
    <ais-search-box />
    <ais-stats />
    <h3>Kategorie</h3>
    <ais-refinement-list attribute="kategorie" />
    <br/>
    <h3>Hersteller</h3>
    <ais-menu-select attribute="hersteller" />
    <h3>Service Type:</h3>
    <ais-refinement-list attribute="serviceType_de" :sort-by="['name:asc']" />
    <h3>Product Condition:</h3>
    <ais-refinement-list attribute="productCondition_de" :sort-by="['name:asc']" />
    <h3>Price Range Selection</h3>
    <ais-range-input attribute="preis" />
    <br/>
    <ais-sort-by
      :items=indexConfig
    />

    <ais-hits>
      <template slot="item" slot-scope="{ item }">
        <p>Titel: {{item.titel}}</p>
        <p>Description: {{item.beschreibung}}</p>
        <p>Kategorie: {{item.kategorie}}</p>
        <p>Hersteller: {{item.hersteller}}</p>
        <p>Preis: {{item.preis}}</p>
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
  AisRangeInput,
  AisSortBy,
  AisMenuSelect
  // for some reason eslint doesn't recognise this dependency, while it's in package.json
  // eslint-disable-next-line import/no-unresolved
} from 'vue-instantsearch';
import algoliasearch from 'algoliasearch/lite';


export default {
  asyncData(context) {
  },
  mounted() {
    if ( this.$route.params.refine.length && this.$route.params.value.length ) {
      let refine = this.$route.params.refine;
      let value = this.$route.params.value;
      refine(value)
    }
  },
  components: {
    AisInstantSearchSsr,
    AisRefinementList,
    AisHits,
    AisHighlight,
    AisSearchBox,
    AisStats,
    AisPagination,
    AisRangeInput,
    AisMenuSelect,
    AisSortBy
  },
  methods:{
    toValue(value, range) {
      return [
      value.min !== null ? value.min : range.min,
      value.max !== null ? value.max : range.max,
      ];
    }
  },
  computed:{
    indexConfig() {
      return [
        { 
          value: process.env.vueAppAlgoliaIndexName, label: 'Relevance' 
        },
        { 
          value: `${process.env.vueAppAlgoliaIndexName}_preis_asc`, label: 'Price Asc'
        },
        { 
          value: `${process.env.vueAppAlgoliaIndexName}_preis_desc`, label: 'Price Desc' 
        },
      ]
    },
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
