<template>
  <section class="container">
    <h1 class="title">
      Recipes
    </h1>
    <h4 class="filter">Filter: </h4>
    <input v-on:keyup="filter" v-model="filterTerm" type="text" id="searchInp" placeholder="Filter by name" class="filter">
    <ul v-if="recipes && recipes.length > 0" class="recipes">
      <li v-for="(recipe, index) in recipes" :key="index" class="recipe">
        <RecipeSimple v-bind:recipe="recipe" v-bind:index="index" />
      </li>
    </ul>
    <p v-else>Sorry, we currently have no recipes for you.</p>
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import RecipeSimple from '~/components/RecipeSimple.vue'
import filter from './recipefilter'

export default {
  components: {
    RecipeSimple
  },
  data () {
    return {
      filterTerm: filter.filterTerm
    }
  },
  async asyncData ({ params, error }) {
    let { data } = await axios.get(`/api/recipes/?filter=${filter.filterTerm}`)
    return { recipes: data }
  },
  head () {
    return {
      title: 'Recipes'
    }
  },
  methods: {
    async filter (e) {
      filter.filterTerm = this.filterTerm = e.target.value.toLowerCase()
      let { data } = await axios.get(`/api/recipes/?filter=${filter.filterTerm}`)
      this.recipes = data
    }
  }
}
</script>

<style scoped>
.filter {
  display: inline;
}

.recipes {
  list-style: none;
  margin: 0;
  padding: 0;
}

.recipe {
  margin: 10px 0;
}
</style>
