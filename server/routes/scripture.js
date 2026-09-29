import express from 'express'
import { getChapter } from '../controllers/scriptureController.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/:book/:chapter', requireAuth, getChapter)

export default router