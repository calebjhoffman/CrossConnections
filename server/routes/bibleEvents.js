import express from 'express'
import {
  getBibleEvents,
  getBibleEventById,
  createBibleEvent,
  updateBibleEvent,
  deleteBibleEvent,
} from '../controllers/bibleEventController.js'
import { requireAuth } from '../middleware/authMiddleware.js'
import { requireRole } from '../middleware/roleMiddleware.js'

const router = express.Router()

router.get('/', requireAuth, getBibleEvents)
router.get('/:id', requireAuth, getBibleEventById)

router.post('/', requireAuth, requireRole('ADMIN'), createBibleEvent)
router.put('/:id', requireAuth, requireRole('ADMIN'), updateBibleEvent)
router.delete('/:id', requireAuth, requireRole('ADMIN'), deleteBibleEvent)

export default router