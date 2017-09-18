# nuxt-express-recipe-viewer

This project uses the inofficial vue-cli nuxt-express preset from https://github.com/nuxt-community/express-template

## Implemented features
* Display list of available recipes or warning message if no recipes are available
* Display individual recipe details including image. If recipe does not exist (anymore) a warning message is written instead.
* Filter through recipes by their name. The filter is applied on the backend. The filter stays active after returning to / from individual recipe routes.

## Outstanding features
* Starring recipes
* Pagination

## Todo
* Write tests for the above, e.g. filtering, error handling, etc.
* Improve eslint rules to be compatible with `prettier` vscode plugin and auto-formatting
* Better styling and improved GUI

> Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev # Or yarn dev

# build for production and launch server
$ npm start # Or yarn start
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## Backpack

We use [backpack](https://github.com/palmerhq/backpack) to watch and build the application, so you can use the latest ES6 features (module syntax, async/await, etc.).
