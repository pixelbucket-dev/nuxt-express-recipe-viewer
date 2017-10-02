<template>
  <div class="recipe-simple">
    Star: <input v-on:change="starRecipe" :key="recipe.index" type="checkbox" v-model="recipe.starred"/>
    <nuxt-link :to="{ name: 'id', params: { currentPage, filterTerm, id: index }}">
      <h3>
        {{recipe.index + 1}} &mdash; {{recipe.name}}
      </h3>
    </nuxt-link>
    <div class="item-container">
      <h4 class="headers cooking-time">Cooking time: </h4>
      <p class="cooking-time">{{recipe.cookingTime}}</p>
    </div>
    <div class="ingredients-container item-container">
      <h4 class="headers">Ingredients:</h4>
      <ul class="ingredients">
        <li v-for="(ingredient, key, index) in recipe.ingredients" :key="key" class="ingredient">{{ingredient}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  name: 'recipesimple',
  props: {
    currentPage: Number,
    filterTerm: String,
    index: Number,
    recipe: Object,
    updateRecipe: Function
  },
  methods: {
    async starRecipe (e) {
      /* const { data } =  */await axios.post(`/api/star/${this.recipe.index}`, {
        starred: this.recipe.starred
      })
      // this.updateRecipe(this.recipe.index, data)
    }
  }
}
</script>

<style scoped>
.cooking-time {
  display: inline;
}

.headers {
  margin: 0;
}

.ingredients-container>.headers {
  margin-bottom: 5px;
}

.ingredients-container {
  margin-top: 10px;
}

.ingredients {
  display: inline-block;
  padding: 0;
}

.ingredient {
  list-style-type: none;
}

.recipe-simple {
  background-color: #f2f2f2;
}
</style>
