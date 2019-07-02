<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="isDialog"
      width="700"
    >
      <v-card class="bg_clr_modal">
        <div class="teaser-main-div">
          <div class="modal-left-part">
            <div class="inner_row">

              <div class="inner-modal-left-part">
                <h3 class='pad-bottom-8'>Kategorie</h3>
                <div class="left-section">
                  <ais-refinement-list attribute="kategorie">
                    <ul slot-scope="{items,
                                    refine,
                                    createURL,
                                    }">
                      <li v-for="item in items" :key="item.value">
                        <a
                          :href="createURL(item)"
                          :style="{ fontWeight: item.isRefined ?  'bold' : '' }"
                          @click.prevent="customRefine(refine, item.value)"
                          >
                          <ais-highlight attribute="item" :hit="item"/>
                          ({{ item.count ? item.count.toLocaleString() : '' }})
                        </a>
                      </li>
                    </ul>
                  </ais-refinement-list>
                  <ais-stats >
                    <template >
                      <button class="call-tow-ac" @click="toggleTeaser">
                      </button>
                    </template>
                  </ais-stats>
                </div>
              </div>

              <div class="clear-e"></div>
            </div>
          </div>
        </div>
        <v-card-actions class="padding-0">
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import { AisRefinementList, AisStats, AisHighlight } from 'vue-instantsearch';

  export default {
    components: {
      AisRefinementList,
      AisStats,
      AisHighlight
    },
    props: ['isDialog'],
    data() {
      return {
        showDialog: this.isDialog
      };
    },
    methods: {
      customRefine( refine, value ) {
        this.$router.push({ path: '/search' });
        refine(value);
      },
      toggleTeaser( ) {

      }
    }

  }
</script>