<template>
  <v-app>
    <h2>
      Go to the search page: <a @click="isDialog=!isDialog">Show search options</a>
    </h2>
    <teaser-dialog :isDialog="isDialog"></teaser-dialog>
  </v-app>
</template>
<script>
  import TeaserDialog from "~/components/TeaserDialog";
  export default {
    components: {
      TeaserDialog
    },
    data() {
      return {
        isDialog: false
      }
    }
  }
</script>
<style>
h2 {
  text-align: center;
}
</style>
