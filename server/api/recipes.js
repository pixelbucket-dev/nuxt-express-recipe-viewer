import { Router } from 'express'
import { recipes } from './recipes.json'

const router = Router()

const listItemSimple = item => ({
  ...item,
  ingredients: item.ingredients.reduce((acc, cur) => acc.concat(cur.name), [])
})

/* GET recipes listing. */
router.get('/recipes', (req, res, next) => {
  if (!req.query.filter || req.query.filter === '') {
    res.json(recipes.map(listItemSimple))
  } else {
    const filterTerm = req.query.filter.toLowerCase()
    const filteredRecipes = recipes
      .filter(item => item.name.toLowerCase().indexOf(filterTerm) !== -1)
      .map(listItemSimple)

    res.json(filteredRecipes)
  }
})

/* GET recipe by ID. */
router.get('/recipes/:id', (req, res, next) => {
  const id = parseInt(req.params.id)
  if (id >= 0 && id < recipes.length) {
    res.json(recipes[id])
  } else {
    res.sendStatus(404)
  }
})

export default router
