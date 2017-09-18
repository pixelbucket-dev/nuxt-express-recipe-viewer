import { Router } from 'express'

import recipes from './recipes'

const router = Router()

// Add Recipe Routes
router.use(recipes)

export default router
