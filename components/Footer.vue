<template>
  <!-- <v-pagination v-on:input="selectPage" :length="maxPages" v-model="currentPage" /> -->
  <v-footer class="my-footer text-xs-center" :fixed="true" dark="false">
    <v-pagination :length="maxPages" v-model="currentPage" @input="selectPage" />
  </v-footer>
</template>

<script>
export default {
  data () {
    return {
      currentPage: 1
    }
  },
  props: ['maxPages'],
  methods: {
    selectPage (current) {
      console.log(`Current: ${current}`)
    }
  }
}
</script>

<style scoped>
.my-footer {
  background-color: #ffffff;
  display: inline-block;
}
</style>
