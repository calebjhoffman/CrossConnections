import prisma from '../utils/prisma.js'

export async function getUserMeta(req, res) {
  const { key } = req.params

  const meta = await prisma.userMeta.findUnique({
    where: {
      userId_key: {
        userId: req.user.userId,
        key,
      },
    },
  })

  res.json({
    key,
    value: meta?.value ?? null,
  })
}

export async function upsertUserMeta(req, res) {
  const { key } = req.params
  const { value } = req.body

  if (typeof value !== 'string') {
    return res.status(400).json({
      error: 'Meta value must be a string.',
    })
  }

  const meta = await prisma.userMeta.upsert({
    where: {
      userId_key: {
        userId: req.user.userId,
        key,
      },
    },
    update: {
      value,
    },
    create: {
      userId: req.user.userId,
      key,
      value,
    },
  })

  res.json({
    message: 'Preference saved.',
    meta,
  })
}