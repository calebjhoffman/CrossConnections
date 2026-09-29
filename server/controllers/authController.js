import bcrypt from 'bcryptjs'
import prisma from '../utils/prisma.js'
import { OAuth2Client } from 'google-auth-library'
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/jwt.js'

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
}

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return res.status(409).json({ error: 'Email is already registered' })
    }

    const passwordHash = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName,
      },
    })

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    res.cookie('refreshToken', refreshToken, cookieOptions)

    res.status(201).json({
      message: 'Account created successfully',
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Registration failed' })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash)

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    res.cookie('refreshToken', refreshToken, cookieOptions)

    res.json({
      message: 'Logged in successfully',
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Login failed' })
  }
}

export const refresh = async (req, res) => {
  try {
    const token = req.cookies.refreshToken

    if (!token) {
      return res.status(401).json({ error: 'No refresh token found' })
    }

    const decoded = verifyRefreshToken(token)

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    })

    if (!user) {
      return res.status(401).json({ error: 'Invalid refresh token' })
    }

    const accessToken = generateAccessToken(user)

    res.json({ accessToken })
  } catch (err) {
    console.error(err)
    res.status(401).json({ error: 'Refresh failed' })
  }
}

export const logout = (req, res) => {
  res.clearCookie('refreshToken', cookieOptions)
  res.status(204).send()
}


export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body

    if (!credential) {
      return res.status(400).json({ error: 'Google credential is required' })
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()

    const email = payload.email
    const googleId = payload.sub
    const firstName = payload.given_name || ''
    const lastName = payload.family_name || ''

    if (!email || !googleId) {
      return res.status(400).json({ error: 'Invalid Google account data' })
    }

    let user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          googleId,
          firstName,
          lastName,
        },
      })
    } else if (!user.googleId) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { googleId },
      })
    }

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    res.cookie('refreshToken', refreshToken, cookieOptions)

    res.json({
      message: 'Logged in with Google successfully',
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    })
  } catch (err) {
    console.error(err)
    res.status(401).json({ error: 'Google login failed' })
  }
}