import algoliasearch from "algoliasearch/lite";
import { createInstantSearch } from "vue-instantsearch";
import { history as historyRouter } from 'instantsearch.js/es/lib/routers';
import { simple as simpleStateMapping } from 'instantsearch.js/es/lib/stateMappings';

const algoliaClient = algoliasearch(
  process.env.vueAppAlgoliaAppId,
  process.env.vueAppAlgoliaApiKey
)

export default function VueInstantSearchPlugin(_, inject) {

  const { instantsearch } = createInstantSearch({
    indexName: 'herzblut_products',
    searchClient: algoliaClient,
    routing: {
      stateMapping: simpleStateMapping(),
      router: historyRouter(),
    },
    async searchFunction(helper) {
      if (helper.state.disjunctiveFacets.length <= 6) {
        helper.search()
      }
    },
    searchParameters: {
      disjunctiveFacets: ['preis', 'hersteller', 'productCondition_de', 'serviceType_de', 'kategorie', 'baujahr']
    }
  });

  inject("instantsearch", instantsearch);
}
