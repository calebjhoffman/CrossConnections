import prisma from '../utils/prisma.js'

export const getHealth = async (req, res) => {
  try {
    const users = await prisma.user.findMany()

    res.json({
      message: 'Server + DB running',
      usersCount: users.length,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'DB error' })
  }
}