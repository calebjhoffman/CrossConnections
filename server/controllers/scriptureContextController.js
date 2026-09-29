import prisma from '../utils/prisma.js'

export async function getVerseContext(req, res, next) {
  try {
    const { book, chapter, verse } = req.params

    const contexts = await prisma.bibleVerseContext.findMany({
      where: {
        book,
        chapter: Number(chapter),
        verse: Number(verse),
      },
      include: {
        topic: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    res.json({ contexts })
  } catch (err) {
    next(err)
  }
}