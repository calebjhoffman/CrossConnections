import prisma from '../utils/prisma.js'

export async function getBibleBooks(req, res) {
  try {
    const books = await prisma.bibleBook.findMany({
      orderBy: {
        order: 'asc',
      },
      include: {
        verses: {
          select: {
            chapter: true,
          },
        },
      },
    })

    const formattedBooks = books.map((book) => {
      const chapterNumbers = book.verses.map((verse) => verse.chapter)

      return {
        id: book.id,
        name: book.name,
        slug: book.slug,
        testament: book.testament,
        order: book.order,
        chapters: chapterNumbers.length
          ? Math.max(...chapterNumbers)
          : 0,
      }
    })

    res.json({
      books: formattedBooks,
    })
  } catch (err) {
    console.error('Could not load Bible books:', err)

    res.status(500).json({
      error: 'Could not load Bible books.',
    })
  }
}