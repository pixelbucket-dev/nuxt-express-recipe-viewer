<template>
  <div class="recipe-simple">
    <nuxt-link :to="{ name: 'id', params: { id: index }}">
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
export default {
  name: 'recipesimple',
  props: {
    index: Number,
    recipe: Object
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
