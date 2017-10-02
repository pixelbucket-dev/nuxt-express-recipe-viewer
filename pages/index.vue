<template>
  <section class="container">
    <h1 class="title">
      Recipes
    </h1>
    <h4 class="filter">Filter: </h4>
    <input v-on:keyup="filter" v-model="filterTerm" type="text" id="searchInp" placeholder="Filter by name" class="filter">
    <ul v-if="recipes && recipes.length > 0" class="recipes">
      <li v-for="(recipe, index) in recipes" :key="index" class="recipe">
        <RecipeSimple :currentPage= "currentPage" :filterTerm= "filterTerm" :index="index" :recipe="recipe" />
      </li>
    </ul>
    <p v-else>Sorry, we currently have no recipes for you.</p>
    <MyFooter :selectPage="selectPage" :max-pages="maxPages" />
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import MyFooter from '~/components/Footer.vue'
import RecipeSimple from '~/components/RecipeSimple.vue'
import filter from './recipefilter'

async function fetchRecipes (filterTerm, currentPage) {
  let { data, headers } = await axios.get(`/api/recipes/?filter=${filterTerm}&pageindex=${currentPage || 0}&itemsperpage=5`)
  return {
    currentPage,
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
  async asyncData ({ params, query, error }) {
    const fetchedRecipes = await fetchRecipes(params.filterTerm || '', params.currentPage || 0)
    return fetchedRecipes
  },
  head () {
    return {
      title: 'Recipes'
    }
  },
  methods: {
    async filter (e) {
      filter.filterTerm = this.filterTerm = e.target.value.toLowerCase()
      const response = await fetchRecipes(filter.filterTerm, 0)
      this.maxPages = response.maxPages
      this.recipes = response.recipes
    },
    async selectPage (pageID) {
      const response = await fetchRecipes(filter.filterTerm, pageID - 1)
      this.currentPage = pageID - 1
      this.maxPages = response.maxPages
      this.recipes = response.recipes
    }/* ,
    updateRecipe (index, data) {
      this.recipes[index] = data
    } */
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
