import express from 'express'
import {
  createSectionHeading,
  deleteSectionHeading,
  getSectionHeadingsForChapter,
  updateSectionHeading,
} from '../controllers/bibleSectionHeadingController.js'
import { requireAuth } from '../middleware/authMiddleware.js'
import { requireRole } from '../middleware/roleMiddleware.js'

const router = express.Router()

router.get('/:book/:chapter', getSectionHeadingsForChapter)

router.post(
  '/',
  requireAuth,
  requireRole('ADMIN'),
  createSectionHeading
)

router.put(
  '/:id',
  requireAuth,
  requireRole('ADMIN'),
  updateSectionHeading
)

router.delete(
  '/:id',
  requireAuth,
  requireRole('ADMIN'),
  deleteSectionHeading
)

export default router