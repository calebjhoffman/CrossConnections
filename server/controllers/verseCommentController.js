import prisma from '../utils/prisma.js'

export async function getVerseComments(req, res) {
  try {
    const { verseId } = req.params

    const comments = await prisma.verseComment.findMany({
      where: { verseId },
      orderBy: { createdAt: 'asc' },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    })

    res.json({ comments })
  } catch (err) {
    console.error('Get verse comments error:', err)
    res.status(500).json({ error: 'Failed to load verse comments' })
  }
}

export async function createVerseComment(req, res) {
  try {
    const userId = req.user.userId
    const { verseId } = req.params
    const { body } = req.body

    if (!body || !body.trim()) {
      return res.status(400).json({ error: 'Comment cannot be empty' })
    }

    const comment = await prisma.verseComment.create({
      data: {
        userId,
        verseId,
        body: body.trim(),
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    })

    res.status(201).json({
      comment,
      flash: {
        message: 'Comment added',
        severity: 'success',
      },
    })
  } catch (err) {
    console.error('Create verse comment error:', err)
    res.status(500).json({ error: 'Failed to add comment' })
  }
}

export async function updateVerseComment(req, res) {
  try {
    const userId = req.user.userId
    const { commentId } = req.params
    const { body } = req.body

    if (!body || !body.trim()) {
      return res.status(400).json({ error: 'Comment cannot be empty' })
    }

    const existingComment = await prisma.verseComment.findUnique({
      where: { id: commentId },
    })

    if (!existingComment) {
      return res.status(404).json({ error: 'Comment not found' })
    }

    if (existingComment.userId !== userId) {
      return res.status(403).json({ error: 'You can only edit your own comments' })
    }

    const comment = await prisma.verseComment.update({
      where: { id: commentId },
      data: {
        body: body.trim(),
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    })

    res.json({
      comment,
      flash: {
        message: 'Comment updated',
        severity: 'success',
      },
    })
  } catch (err) {
    console.error('Update verse comment error:', err)
    res.status(500).json({ error: 'Failed to update comment' })
  }
}

export async function deleteVerseComment(req, res) {
  try {
    const userId = req.user.userId
    const { commentId } = req.params

    const existingComment = await prisma.verseComment.findUnique({
      where: { id: commentId },
    })

    if (!existingComment) {
      return res.status(404).json({ error: 'Comment not found' })
    }

    if (existingComment.userId !== userId) {
      return res.status(403).json({ error: 'You can only delete your own comments' })
    }

    await prisma.verseComment.delete({
      where: { id: commentId },
    })

    res.json({
      success: true,
      flash: {
        message: 'Comment deleted',
        severity: 'info',
      },
    })
  } catch (err) {
    console.error('Delete verse comment error:', err)
    res.status(500).json({ error: 'Failed to delete comment' })
  }
}