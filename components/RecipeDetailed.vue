<template>
  <section class="container">
    <h1 class="title">
      {{ recipe.name }}
    </h1>
    <img v-bind:src="recipe.imageUrl" class="recipe-image" />
    <div class="item-container">
      <h4 class="headers cooking-time">Cooking time </h4>
      <p>{{recipe.cookingTime}}</p>
    </div>
    <div class="ingredients-container item-container">
      <h4 class="headers">Ingredients</h4>
      <ul class="ingredients">
        <li v-for="(ingredient, key, index) in recipe.ingredients" :key="key" class="ingredient">
          <h5 class="ingredient-data">{{ingredient.name}}: </h5>
          <p class="ingredient-data">{{ingredient.quantity}}</p>
        </li>
      </ul>
    </div>
    <nuxt-link class="button" to="/">
      Recipes
    </nuxt-link>
  </section>
</template>

<script>
export default {
  name: 'RecipeDetailed',
  props: {
    index: Number,
    recipe: Object
  }
}
</script>

<style scoped>
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
