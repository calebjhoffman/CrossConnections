import prisma from '../utils/prisma.js'

export async function getSavedVerses(req, res) {
  try {
    const userId = req.user.userId

    const savedVerses = await prisma.userSavedVerse.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        verse: {
          include: {
            book: true,
            translation: true,
            userHighlights: {
              where: { userId },
              select: {
                color: true,
              },
            },
          },
        },
      },
    })

    res.json({ savedVerses })
  } catch (err) {
    console.error('Get saved verses error:', err)
    res.status(500).json({ error: 'Failed to load saved verses' })
  }
}

export async function saveVerse(req, res) {
  try {
    const userId = req.user.userId
    const { verseId } = req.params

    const savedVerse = await prisma.userSavedVerse.upsert({
      where: {
        userId_verseId: {
          userId,
          verseId,
        },
      },
      update: {},
      create: {
        userId,
        verseId,
      },
    })

    res.json({
      savedVerse,
      flash: {
        message: 'Verse saved',
        severity: 'success',
      },
    })
  } catch (err) {
    console.error('Save verse error:', err)
    res.status(500).json({ error: 'Failed to save verse' })
  }
}

export async function unsaveVerse(req, res) {
  try {
    const userId = req.user.userId
    const { verseId } = req.params

    await prisma.userSavedVerse.deleteMany({
      where: {
        userId,
        verseId,
      },
    })

    res.json({
      success: true,
      flash: {
        message: 'Verse removed from saved',
        severity: 'info',
      },
    })
  } catch (err) {
    console.error('Unsave verse error:', err)
    res.status(500).json({ error: 'Failed to remove saved verse' })
  }
}