<template>
  <RecipeDetailed :recipe="recipe" :currentPage="currentPage" :filterTerm="filterTerm" />
</template>

<script>
import axios from '~/plugins/axios'
import RecipeDetailed from '~/components/RecipeDetailed.vue'

export default {
  name: 'id',
  components: {
    RecipeDetailed
  },
  data () {
    return {
      currentPage: 0,
      filterTerm: ''
    }
  },
  asyncData ({ params, error }) {
    return axios.get(`/api/recipes/${params.id}`)
      .then((res) => {
        return { currentPage: params.currentPage, filterTerm: params.filterTerm, recipe: res.data }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'Sorry, this recipe doesn\'t exist or may have been removed.' })
      })
  },
  head () {
    return {
      title: `Recipe: ${this.recipe.name}`
    }
  }
}
</script>

<style scoped>
.title {
  margin: 30px 0;
}

.button {
  margin-top: 30px;
}

.headers {
  margin: 0;
}

.ingredients-container>.headers {
  margin-bottom: 5px;
}

.item-container {
  margin-top: 10px;
}

.ingredients {
  display: inline-block;
  padding: 0;
}

.ingredient {
  list-style-type: none;
  padding: 3px 0;
  text-align: left;
}

.ingredient > .ingredient-data {
  display: inline;
}

.recipe-detailed {
  background-color: #f2f2f2;
}

.recipe-image {
  max-height: 250px;
}
</style>
