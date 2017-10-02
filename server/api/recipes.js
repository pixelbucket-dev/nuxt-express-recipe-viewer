import { Router } from 'express'
import { recipes } from './recipes.json'

const recipesIndexes = recipes.map((item, index) => {
  item.index = index
  return item
})

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
    const filterTerm = req.query.filter.toLowerCase()
    const filteredRecipes = recipesIndexes
      .filter(item => item.name.toLowerCase().indexOf(filterTerm) !== -1)
      .map(listItemSimple)
    recipesForPage = getRecipesForPage(req.query, filteredRecipes)
    res.set({
      'Content-Range': getContentRange(filteredRecipes)
    })
    res.json(recipesForPage)
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

/* Star a particular recipe */
router.post('/star/:id', (req, res, next) => {
  const id = parseInt(req.params.id)
  if (recipes[id]) {
    let body = []
    req.on('data', (chunk) => {
      body.push(chunk)
    }).on('end', () => {
      body = JSON.parse(Buffer.concat(body).toString())
      recipes[id].starred = body.starred
      res.json(recipesIndexes[id])
    })
  }
})

export default router
