import express from 'express'
import {
  deleteVerseHighlight,
  getChapterHighlights,
  upsertVerseHighlight,
} from '../controllers/verseHighlightController.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/:book/:chapter', requireAuth, getChapterHighlights)
router.put('/:verseId', requireAuth, upsertVerseHighlight)
router.delete('/:verseId', requireAuth, deleteVerseHighlight)

export default router