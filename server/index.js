import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import prisma from './utils/prisma.js'
import healthRoutes from './routes/health.js'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.js'
import bibleEventRoutes from './routes/bibleEvents.js'
import scriptureContextRoutes from './routes/scriptureContext.js'
import scriptureRoutes from './routes/scripture.js'
import verseHighlightRoutes from './routes/verseHighlights.js'
import savedVerseRoutes from './routes/savedVerses.js'
import verseCommentRoutes from './routes/verseComments.js'
import userMetaRoutes from './routes/userMeta.js'
import bibleBooksRoutes from './routes/bibleBooks.js'
import bibleSectionHeadingRoutes from './routes/bibleSectionHeadings.js'

dotenv.config()

const app = express()

app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use('/api/health', healthRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/user-meta', userMetaRoutes)
app.use('/api/bible-events', bibleEventRoutes)
app.use('/api/scripture-context', scriptureContextRoutes)
app.use('/api/scripture', scriptureRoutes)
app.use('/api/verse-highlights', verseHighlightRoutes)
app.use('/api/saved-verses', savedVerseRoutes)
app.use('/api/verse-comments', verseCommentRoutes)
app.use('/api/bible-books', bibleBooksRoutes)
app.use('/api/bible-section-headings', bibleSectionHeadingRoutes)
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})