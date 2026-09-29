import express from 'express'
import {
  getUserMeta,
  upsertUserMeta,
} from '../controllers/userMetaController.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/:key', requireAuth, getUserMeta)
router.put('/:key', requireAuth, upsertUserMeta)

export default router