import { Router } from 'express'
// import { paginate } from 'express-paginate'

import recipes from './recipes'

// Router.use(paginate.middleware(10, 50))

const router = Router()

// Add Recipe Routes
router.use(recipes)

export default router
