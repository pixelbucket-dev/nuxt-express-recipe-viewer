import { Router } from 'express'
import { recipes } from './recipes.json'

const recipesIndexes = recipes.map((item, index) => {
  item.index = index
  return item
})

let filterTerm = ''
let filteredRecipes = recipesIndexes

const router = Router()

const listItemSimple = (item, index) => ({
  ...item,
  ingredients: item.ingredients.reduce((acc, cur) => acc.concat(cur.name), [])
})
const calcMaxPages = (recipesFiltered, newItemsPerPage) => Math.ceil(recipesFiltered.length / newItemsPerPage)

let itemsPerPage = 5
let maxPages = calcMaxPages(recipesIndexes, itemsPerPage)
let start = 0
let end = itemsPerPage

function getRecipesForPage (query, recipesFiltered) {
  if (itemsPerPage !== query.itemsperpage) {
    itemsPerPage = Number(query.itemsperpage)
    maxPages = calcMaxPages(recipesFiltered, itemsPerPage)
  }
  const pageIndex = Number(query.pageindex) || 0
  start = pageIndex * itemsPerPage
  end = Math.min(start + itemsPerPage, recipesFiltered.length)
  /* console.log(`filter: ${query.filter}`)
  console.log(`itemsPerPage: ${itemsPerPage}`)
  console.log(`pageIndex: ${pageIndex}`)
  console.log(`start: ${start}`)
  console.log(`end: ${end}`)
  console.log(`maxPages: ${maxPages}`)
  console.log(`start + itemsPerPage: ${start + Number(itemsPerPage)}`) */
  return recipesFiltered.slice(start, end)
}

const getContentRange = (recipesFiltered) => `recipes/${start}-${end - 1}/${recipesFiltered.length}/${maxPages}`
/* GET recipes listing. */
router.get('/recipes', (req, res, next) => {
  let recipesForPage
  if (!req.query.filter || req.query.filter === '') {
    recipesForPage = getRecipesForPage(req.query, recipesIndexes)
    res.set({
      'Content-Range': getContentRange(recipesIndexes)
    })
    res.json(recipesForPage.map(listItemSimple))
  } else {
    const newFilterTerm = req.query.filter.toLowerCase()
    if (filterTerm !== newFilterTerm) {
      filterTerm = newFilterTerm
      filteredRecipes = recipesIndexes
        .filter(item => item.name.toLowerCase().indexOf(filterTerm) !== -1)
        .map(listItemSimple)
    }
    // console.log('filteredRecipes: ', filteredRecipes)
    recipesForPage = getRecipesForPage(req.query, filteredRecipes)
    res.set({
      'Content-Range': getContentRange(filteredRecipes)
    })
    res.json(recipesForPage)
    // res.json(filteredRecipes)
  }
})

/* GET recipe by ID. */
router.get('/recipes/:id', (req, res, next) => {
  const id = parseInt(req.params.id)
  if (id >= 0 && id < recipesIndexes.length) {
    res.json(recipesIndexes[id])
  } else {
    res.sendStatus(404)
  }
})

export default router
