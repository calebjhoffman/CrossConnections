import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ChapterPickerDrawer from '@/components/bible/ChapterPickerDrawer'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { rawFetch } from '@/utils/fetcher'

export default function BiblePage() {
  const navigate = useNavigate()
  const [selectedBook, setSelectedBook] = useState(null)
  const [chapterDrawerOpen, setChapterDrawerOpen] = useState(false)
  const { accessToken } = useAuth()

  const [books, setBooks] = useState([])
  const [booksLoading, setBooksLoading] = useState(true)

  useEffect(() => {
    async function loadBooks() {
      try {
        const data = await rawFetch(
          '/bible-books',
          {
            showFlash: false,
          },
          accessToken
        )

        setBooks(data.books || [])
      } catch (err) {
        console.error('Could not load Bible books:', err)
        setBooks([])
      } finally {
        setBooksLoading(false)
      }
    }

    if (accessToken) {
      loadBooks()
    }
  }, [accessToken])

  useEffect(() => {
    localStorage.setItem(
      'cross_connections_last_bible_location',
      JSON.stringify({
        type: 'library',
        path: '/bible',
      })
    )
  }, [])

  function openChapterPicker(book) {
    setSelectedBook(book)
    setChapterDrawerOpen(true)
  }


  const oldTestamentBooks = books.filter(
    (book) => book.testament === 'OT'
  )

  const newTestamentBooks = books.filter(
    (book) => book.testament === 'NT'
  )

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="overline" color="primary" fontWeight={700}>
          Bible
        </Typography>

        <Typography variant="h4" component="h1" fontWeight={800}>
          Scripture Library
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Explore Scripture book by book.
        </Typography>
      </Box>

      <Box>
        <Typography
          variant="subtitle2"
          fontWeight={700}
          color="text.secondary"
          sx={{
            px: 1,
            mb: 1,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Old Testament
        </Typography>

        <List disablePadding>
          {oldTestamentBooks.map((book) => (
            <ListItemButton
              key={book.slug}
              onClick={() => openChapterPicker(book)}
              sx={{
                py: 1.75,
                px: 1,
                borderRadius: 1,
              }}
            >
            <ListItemText
              primary={book.name}
              secondary={`${book.chapters} chapters`}
              slotProps={{
                primary: {
                  sx: {
                    fontWeight: 600,
                  },
                },
              }}
            />
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Box>
        <Typography
          variant="subtitle2"
          fontWeight={700}
          color="text.secondary"
          sx={{
            px: 1,
            mb: 1,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          New Testament
        </Typography>

        <List disablePadding>
          {newTestamentBooks.map((book) => (
            <ListItemButton
              key={book.slug}
              onClick={() => openChapterPicker(book)}
              sx={{
                py: 1.75,
                px: 1,
                borderRadius: 1,
              }}
            >
            <ListItemText
              primary={book.name}
              secondary={`${book.chapters} chapters`}
              slotProps={{
                primary: {
                  sx: {
                    fontWeight: 600,
                  },
                },
              }}
            />
            </ListItemButton>
          ))}
        </List>
      </Box>      
      <ChapterPickerDrawer
        open={chapterDrawerOpen}
        onClose={() => setChapterDrawerOpen(false)}
        book={selectedBook}
      />
    </Stack>
  )
}