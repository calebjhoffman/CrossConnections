import express from 'express'
import {
  getSavedVerses,
  saveVerse,
  unsaveVerse,
} from '../controllers/savedVerseController.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', requireAuth, getSavedVerses)
router.post('/:verseId', requireAuth, saveVerse)
router.delete('/:verseId', requireAuth, unsaveVerse)

export default router