import prisma from '../utils/prisma.js'

export async function getChapter(req, res, next) {
  try {
    const { book, chapter } = req.params

    const bibleBook = await prisma.bibleBook.findUnique({
      where: {
        slug: book.toLowerCase(),
      },
    })

    if (!bibleBook) {
      return res.status(404).json({
        error: 'Bible book not found',
      })
    }

    const translation = await prisma.bibleTranslation.findFirst({
      where: {
        isDefault: true,
      },
    })

    if (!translation) {
      return res.status(404).json({
        error: 'Default Bible translation not found',
      })
    }

    const verses = await prisma.bibleVerse.findMany({
      where: {
        bookId: bibleBook.id,
        translationId: translation.id,
        chapter: Number(chapter),
      },
      orderBy: {
        verse: 'asc',
      },
    })

    res.json({
      book: bibleBook,
      translation,
      chapter: Number(chapter),
      verses,
    })
  } catch (err) {
    next(err)
  }
}