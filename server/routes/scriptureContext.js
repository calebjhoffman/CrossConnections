import express from 'express'
import { getVerseContext } from '../controllers/scriptureContextController.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/:book/:chapter/:verse', requireAuth, getVerseContext)

export default router