import express from 'express'
import {
  getVerseComments,
  createVerseComment,
  updateVerseComment,
  deleteVerseComment,
} from '../controllers/verseCommentController.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/:verseId', requireAuth, getVerseComments)
router.post('/:verseId', requireAuth, createVerseComment)
router.patch('/:commentId', requireAuth, updateVerseComment)
router.delete('/:commentId', requireAuth, deleteVerseComment)

export default router