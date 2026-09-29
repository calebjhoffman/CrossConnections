import express from 'express'
import { getBibleBooks } from '../controllers/bibleBooksController.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', requireAuth, getBibleBooks)

export default router