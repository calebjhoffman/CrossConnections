import prisma from '../utils/prisma.js'

export async function getSectionHeadingsForChapter(req, res, next) {
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

    const headings = await prisma.bibleSectionHeading.findMany({
      where: {
        bookId: bibleBook.id,
        chapter: Number(chapter),
        status: 'published',
      },
      orderBy: {
        verseStart: 'asc',
      },
    })

    res.json({
      headings,
    })
  } catch (err) {
    next(err)
  }
}

export async function createSectionHeading(req, res, next) {
  try {
    const userId = req.user?.userId

    const {
      bookSlug,
      chapter,
      verseStart,
      verseEnd,
      title,
      summary,
      type = 'section',
      source = 'manual',
      status = 'published',
    } = req.body

    if (!bookSlug || !chapter || !verseStart || !title) {
      return res.status(400).json({
        error: 'Book, chapter, verse start, and title are required.',
      })
    }

    const bibleBook = await prisma.bibleBook.findUnique({
      where: {
        slug: bookSlug.toLowerCase(),
      },
    })

    if (!bibleBook) {
      return res.status(404).json({
        error: 'Bible book not found.',
      })
    }

    const heading = await prisma.bibleSectionHeading.create({
      data: {
        bookId: bibleBook.id,
        chapter: Number(chapter),
        verseStart: Number(verseStart),
        verseEnd: verseEnd ? Number(verseEnd) : null,
        title: title.trim(),
        summary: summary || null,
        type,
        source,
        status,
        createdById: userId || null,
        updatedById: userId || null,
      },
    })

    res.status(201).json({
      heading,
      flash: {
        message: 'Section heading created.',
        severity: 'success',
      },
    })
  } catch (err) {
    next(err)
  }
}

export async function updateSectionHeading(req, res, next) {
  try {
    const { id } = req.params
    const userId = req.user?.userId

    const {
      chapter,
      verseStart,
      verseEnd,
      title,
      summary,
      type,
      source,
      status,
    } = req.body

    const heading = await prisma.bibleSectionHeading.update({
      where: { id },
      data: {
        ...(chapter !== undefined && { chapter: Number(chapter) }),
        ...(verseStart !== undefined && { verseStart: Number(verseStart) }),
        ...(verseEnd !== undefined && {
          verseEnd: verseEnd ? Number(verseEnd) : null,
        }),
        ...(title !== undefined && { title: title.trim() }),
        ...(summary !== undefined && { summary: summary || null }),
        ...(type !== undefined && { type }),
        ...(source !== undefined && { source }),
        ...(status !== undefined && { status }),
        updatedById: userId || null,
      },
    })

    res.json({
      heading,
      flash: {
        message: 'Section heading updated.',
        severity: 'success',
      },
    })
  } catch (err) {
    next(err)
  }
}

export async function deleteSectionHeading(req, res, next) {
  try {
    const { id } = req.params

    await prisma.bibleSectionHeading.delete({
      where: { id },
    })

    res.json({
      message: 'Section heading deleted.',
      flash: {
        message: 'Section heading deleted.',
        severity: 'success',
      },
    })
  } catch (err) {
    next(err)
  }
}