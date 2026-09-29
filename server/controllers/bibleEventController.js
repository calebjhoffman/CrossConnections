import prisma from '../utils/prisma.js'

function cleanOptionalString(value) {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed.length ? trimmed : null
}

function normalizePassages(passages = []) {
  if (!Array.isArray(passages)) return []

  return passages.map((passage) => ({
    book: passage.book.trim(),
    chapterStart: Number(passage.chapterStart),
    verseStart: Number(passage.verseStart),
    chapterEnd: passage.chapterEnd ? Number(passage.chapterEnd) : null,
    verseEnd: passage.verseEnd ? Number(passage.verseEnd) : null,
    label: cleanOptionalString(passage.label),
  }))
}

export async function getBibleEvents(req, res, next) {
  try {
    const eras = await prisma.bibleEra.findMany({
      where: {
        status: 'PUBLISHED',
      },
      orderBy: {
        orderIndex: 'asc',
      },
      include: {
        events: {
          where: {
            status: 'published',
          },
          orderBy: {
            orderIndex: 'asc',
          },
          include: {
            passages: {
              orderBy: [
                { book: 'asc' },
                { chapterStart: 'asc' },
                { verseStart: 'asc' },
              ],
            },
          },
        },
      },
    })

    res.json({ eras })
  } catch (err) {
    next(err)
  }
}

export async function getBibleEventById(req, res, next) {
  try {
    const { id } = req.params

    const event = await prisma.bibleEvent.findUnique({
      where: { id },
      include: {
        passages: {
          orderBy: [
            { book: 'asc' },
            { chapterStart: 'asc' },
            { verseStart: 'asc' },
          ],
        },
      },
    })

    if (!event) {
      return res.status(404).json({
        error: 'Bible event not found',
      })
    }

    res.json({ event })
  } catch (err) {
    next(err)
  }
}

export async function createBibleEvent(req, res, next) {
  try {
    const {
      title,
      slug,
      summary,
      description,
      orderIndex,
      period,
      era,
      category,
      startYear,
      endYear,
      dateLabel,
      source,
      status,
      passages,
    } = req.body

    if (!title?.trim()) {
      return res.status(400).json({ error: 'Title is required' })
    }

    if (!slug?.trim()) {
      return res.status(400).json({ error: 'Slug is required' })
    }

    if (orderIndex === undefined || orderIndex === null || orderIndex === '') {
      return res.status(400).json({ error: 'Order index is required' })
    }

    const event = await prisma.bibleEvent.create({
      data: {
        title: title.trim(),
        slug: slug.trim(),
        summary: cleanOptionalString(summary),
        description: cleanOptionalString(description),
        orderIndex: Number(orderIndex),
        period: cleanOptionalString(period),
        era: cleanOptionalString(era),
        category: cleanOptionalString(category),
        startYear: startYear ? Number(startYear) : null,
        endYear: endYear ? Number(endYear) : null,
        dateLabel: cleanOptionalString(dateLabel),
        source: source || 'manual',
        status: status || 'published',
        createdById: req.user?.id || null,
        updatedById: req.user?.id || null,
        passages: {
          create: normalizePassages(passages),
        },
      },
      include: {
        passages: true,
      },
    })

    res.status(201).json({ event })
  } catch (err) {
    next(err)
  }
}

export async function updateBibleEvent(req, res, next) {
  try {
    const { id } = req.params

    const existingEvent = await prisma.bibleEvent.findUnique({
      where: { id },
    })

    if (!existingEvent) {
      return res.status(404).json({ error: 'Bible event not found' })
    }

    const {
      title,
      slug,
      summary,
      description,
      orderIndex,
      period,
      era,
      category,
      startYear,
      endYear,
      dateLabel,
      source,
      status,
      passages,
    } = req.body

    const event = await prisma.bibleEvent.update({
      where: { id },
      data: {
        title: title?.trim(),
        slug: slug?.trim(),
        summary: cleanOptionalString(summary),
        description: cleanOptionalString(description),
        orderIndex: Number(orderIndex),
        period: cleanOptionalString(period),
        era: cleanOptionalString(era),
        category: cleanOptionalString(category),
        startYear: startYear ? Number(startYear) : null,
        endYear: endYear ? Number(endYear) : null,
        dateLabel: cleanOptionalString(dateLabel),
        source: source || 'manual',
        status: status || 'published',
        updatedById: req.user?.id || null,
        passages: Array.isArray(passages)
          ? {
              deleteMany: {},
              create: normalizePassages(passages),
            }
          : undefined,
      },
      include: {
        passages: {
          orderBy: [
            { book: 'asc' },
            { chapterStart: 'asc' },
            { verseStart: 'asc' },
          ],
        },
      },
    })

    res.json({ event })
  } catch (err) {
    next(err)
  }
}

export async function deleteBibleEvent(req, res, next) {
  try {
    const { id } = req.params

    const existingEvent = await prisma.bibleEvent.findUnique({
      where: { id },
    })

    if (!existingEvent) {
      return res.status(404).json({ error: 'Bible event not found' })
    }

    await prisma.bibleEvent.delete({
      where: { id },
    })

    res.json({ message: 'Bible event deleted' })
  } catch (err) {
    next(err)
  }
}