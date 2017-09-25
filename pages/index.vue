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
    <MyFooter :next="next" :max-pages="maxPages" />
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import MyFooter from '~/components/Footer.vue'
import RecipeSimple from '~/components/RecipeSimple.vue'
import filter from './recipefilter'

async function fetchRecipes (filterTerm) {
  let { data, headers } = await axios.get(`/api/recipes/?filter=${filterTerm}&pageindex=0&itemsperpage=5`)
  console.log(headers)
  return {
    recipes: data,
    maxPages: parseInt(headers['content-range'].split('/')[3])
  }
}

export default {
  components: {
    MyFooter,
    RecipeSimple
  },
  data () {
    return {
      filterTerm: filter.filterTerm
    }
  },
  async asyncData ({ params, error }) {
    return fetchRecipes('')
  },
  head () {
    return {
      title: 'Recipes'
    }
  },
  methods: {
    async filter (e) {
      filter.filterTerm = this.filterTerm = e.target.value.toLowerCase()
      // const response = fetchRecipes(filter.filterTerm)
      let { data, headers } = await axios.get(`/api/recipes/?filter=${filter.filterTerm}&pageindex=0&itemsperpage=5`)
      // debugger// eslint-disable-line
      this.maxPages = parseInt(headers['content-range'].split('/')[3])
      this.recipes = data
      // console.log(response)
      // debugger // eslint-disable-line
      // this.maxPages = response.maxPages
      // this.recipes = response.recipes
    },
    next () {

    }
  }
}
</script>

<style scoped>
.container {
  /* margin: 0; */
  width: 100%;
  padding: 100px 0;
  text-align: center;
}

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
