import express from 'express'
import { requireAuth } from '../middleware/authMiddleware.js'
import prisma from '../utils/prisma.js'

import {
  register,
  login,
  refresh,
  logout,
  googleLogin,
} from '../controllers/authController.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/refresh', refresh)
router.post('/logout', logout)
router.post('/google', googleLogin)

router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    })

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      })
    }

    res.json({
      message: 'Authenticated',
      user,
    })
  } catch (err) {
    next(err)
  }
})

export default router