import prisma from '../utils/prisma.js'

export async function getChapterHighlights(req, res) {
  const { book, chapter } = req.params
  const userId = req.user.userId

  const highlights = await prisma.userVerseHighlight.findMany({
    where: {
      userId,
      verse: {
        book: {
          slug: book,
        },
        chapter: Number(chapter),
      },
    },
    select: {
      id: true,
      color: true,
      verseId: true,
      verse: {
        select: {
          chapter: true,
          verse: true,
        },
      },
    },
  })

  res.json({ highlights })
}

export async function upsertVerseHighlight(req, res) {
  const { verseId } = req.params
  const { color } = req.body
  const userId = req.user.userId
  if (!color) {
    return res.status(400).json({ error: 'Highlight color is required.' })
  }

  const highlight = await prisma.userVerseHighlight.upsert({
    where: {
      userId_verseId: {
        userId,
        verseId,
      },
    },
    update: {
      color,
    },
    create: {
      userId,
      verseId,
      color,
    },
  })

  res.json({
    highlight,
    flash: {
      message: 'Verse highlighted.',
      severity: 'success',
    },
  })
}

export async function deleteVerseHighlight(req, res) {
  const { verseId } = req.params
  const userId = req.user.userId

  await prisma.userVerseHighlight.deleteMany({
    where: {
      userId,
      verseId,
    },
  })

  res.json({
    flash: {
      message: 'Highlight removed.',
      severity: 'info',
    },
  })
}