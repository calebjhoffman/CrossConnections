import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Box,
  IconButton,
  Paper,
  Skeleton,
  Slide,
  Stack,
  Tooltip,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material'
import TitleIcon from '@mui/icons-material/Title'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined'
import CloseIcon from '@mui/icons-material/Close'
import FormatColorResetOutlinedIcon from '@mui/icons-material/FormatColorResetOutlined'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import { useAuth } from '@/context/AuthContext'
import { rawFetch } from '@/utils/fetcher'
import VerseContextDrawer from '@/components/scripture/VerseContextDrawer'
import { useReaderSettings } from '@/context/ReaderSettingsContext'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ReaderOptionsDrawer from '@/components/scripture/ReaderOptionsDrawer'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import { getBibleAudioUrl } from '@/utils/bibleAudio'


const HIGHLIGHT_OPTIONS = [
  {
    key: 'yellow',
    label: 'Highlight yellow',
    textBg: 'rgba(255, 193, 7, 0.28)',
    circleBg: 'rgba(255, 193, 7, 0.75)',
  },
  {
    key: 'blue',
    label: 'Highlight blue',
    textBg: 'rgba(33, 150, 243, 0.18)',
    circleBg: 'rgba(33, 150, 243, 0.65)',
  },
  {
    key: 'green',
    label: 'Highlight green',
    textBg: 'rgba(76, 175, 80, 0.2)',
    circleBg: 'rgba(76, 175, 80, 0.65)',
  },
]

const LAST_READING_KEY = 'cross_connections_last_reading'

export default function BibleReaderPage() {
  const { accessToken, user } = useAuth()
  const { book, chapter } = useParams()
  const navigate = useNavigate()
  const tapTimerRef = useRef(null)

  const { currentPreset } = useReaderSettings()

  const [chapterData, setChapterData] = useState(null)
  const [chapterLoading, setChapterLoading] = useState(true)
  const [selectedVerse, setSelectedVerse] = useState(null)
  const [highlightColor, setHighlightColor] = useState('yellow')
  const [savedHighlights, setSavedHighlights] = useState({})
  const [savedVerses, setSavedVerses] = useState({})
  const [contextDrawerOpen, setContextDrawerOpen] = useState(false)
  const [selectedReference, setSelectedReference] = useState('')
  const [verseContext, setVerseContext] = useState([])
  const [verseComments, setVerseComments] = useState([])
  const [commentsLoading, setCommentsLoading] = useState(false)
  const [readerOptionsOpen, setReaderOptionsOpen] = useState(false)

  const [sectionHeadings, setSectionHeadings] = useState([])
  const [headingDialogOpen, setHeadingDialogOpen] = useState(false)
  const [headingTitle, setHeadingTitle] = useState('')

  const [bibleBooks, setBibleBooks] = useState([])

  const [editingHeading, setEditingHeading] = useState(null)

  const audioRef = useRef(null)

  const [audioPlaying, setAudioPlaying] = useState(false)

  const getHighlightOption = (color) =>
    HIGHLIGHT_OPTIONS.find((option) => option.key === color)


  useEffect(() => {
    async function loadBibleBooks() {
      try {
        const data = await rawFetch('/bible-books', {}, accessToken)

        setBibleBooks(data.books || [])
      } catch (err) {
        console.error('Could not load Bible books:', err)
        setBibleBooks([])
      }
    }

    loadBibleBooks()
  }, [accessToken])



  useEffect(() => {
    async function loadChapter() {
      const startedAt = Date.now()
      setChapterLoading(true)
      setSelectedVerse(null)
      setContextDrawerOpen(false)

      try {
        const data = await rawFetch(`/scripture/${book}/${chapter}`, {}, accessToken)
        setChapterData(data)

        try {
          const headingData = await rawFetch(
            `/bible-section-headings/${data.book.slug}/${data.chapter}`,
            {},
            accessToken
          )

          setSectionHeadings(headingData.headings || [])
        } catch (err) {
          console.error('Could not load section headings:', err)
          setSectionHeadings([])
        }

        try {
          const highlightData = await rawFetch(
            `/verse-highlights/${data.book.slug}/${data.chapter}`,
            {},
            accessToken
          )

          const highlightsByVerseId = {}

          highlightData.highlights?.forEach((highlight) => {
            highlightsByVerseId[highlight.verseId] = highlight.color
          })

          setSavedHighlights(highlightsByVerseId)
        } catch (err) {
          console.error('Could not load verse highlights:', err)
          setSavedHighlights({})
        }

        try {
          const savedData = await rawFetch('/saved-verses', {}, accessToken)

          const savedByVerseId = {}

          savedData.savedVerses?.forEach((savedVerse) => {
            savedByVerseId[savedVerse.verseId] = true
          })

          setSavedVerses(savedByVerseId)
        } catch (err) {
          console.error('Could not load saved verses:', err)
          setSavedVerses({})
        }
      } catch (err) {
        console.error('Could not load chapter:', err)
        setChapterData(null)
      } finally {
          const elapsed = Date.now() - startedAt
          const remaining = Math.max(MIN_READER_LOADING_MS - elapsed, 0)

          await wait(remaining)

          setChapterLoading(false)
        }
    }

    loadChapter()

    return () => {
      if (tapTimerRef.current) clearTimeout(tapTimerRef.current)
    }
  }, [accessToken, book, chapter])


  useEffect(() => {
    if (!chapterData || chapterLoading) return

    const savedReading = localStorage.getItem(LAST_READING_KEY)

    if (!savedReading) return

    try {
      const parsedReading = JSON.parse(savedReading)

      if (
        parsedReading?.book !== book ||
        Number(parsedReading?.chapter) !== Number(chapter) ||
        !parsedReading?.verseId
      ) {
        return
      }

      window.setTimeout(() => {
        const verseElement = document.getElementById(`verse-${parsedReading.verseId}`)

        if (!verseElement) return

        verseElement.scrollIntoView({
          behavior: 'instant',
          block: 'center',
        })
      }, 120)
    } catch (err) {
      console.error('Could not restore reading position:', err)
    }
  }, [chapterData, chapterLoading, book, chapter])



useEffect(() => {
  const location = {
    type: 'reader',
    path: `/bible/${book}/${chapter}`,
    book,
    chapter: Number(chapter),
  }

  localStorage.setItem(
    'cross_connections_last_bible_location',
    JSON.stringify(location)
  )

  if (!accessToken) return

  async function saveBibleLocation() {
    try {
      await rawFetch(
        '/user-meta/last_bible_location',
        {
          method: 'PUT',
          body: JSON.stringify({
            value: JSON.stringify(location),
          }),
          showFlash: false,
        },
        accessToken
      )
    } catch (err) {
      console.error('Could not save Bible location:', err)
    }
  }

  saveBibleLocation()
}, [accessToken, book, chapter])


  useEffect(() => {
    if (!chapterData || chapterLoading) return

    const verseElements = document.querySelectorAll('[data-verse-id]')
    if (!verseElements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)

        if (!visibleEntries.length) return

        const topVisibleEntry = visibleEntries.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        )[0]

        const readingPosition = {
          type: 'reader',
          path: `/bible/${book}/${chapter}`,
          book,
          chapter: Number(chapter),
          verseId: topVisibleEntry.target.dataset.verseId,
          verseNumber: Number(topVisibleEntry.target.dataset.verseNumber),
        }

        localStorage.setItem(
          LAST_READING_KEY,
          JSON.stringify(readingPosition)
        )

        if (!accessToken) return

        rawFetch(
          '/user-meta/last_reading_position',
          {
            method: 'PUT',
            body: JSON.stringify({
              value: JSON.stringify(readingPosition),
            }),
            showFlash: false,
          },
          accessToken
        ).catch((err) => {
          console.error('Could not save reading position:', err)
        })
      },
      {
        root: null,
        threshold: 0.35,
      }
    )

    verseElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [chapterData, chapterLoading, book, chapter, accessToken])



  useEffect(() => {
    setAudioPlaying(false)

    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }, [book, chapter])


  async function toggleChapterAudio() {
    if (!audioRef.current) return

    try {
      if (audioPlaying) {
        audioRef.current.pause()
        setAudioPlaying(false)
        return
      }

      await audioRef.current.play()
      setAudioPlaying(true)
    } catch (err) {
      console.error('Could not play chapter audio:', err)
    }
  }


  async function saveSectionHeading() {
    if (!headingTitle.trim()) return

    try {
      if (editingHeading) {
        const data = await rawFetch(
          `/bible-section-headings/${editingHeading.id}`,
          {
            method: 'PUT',
            body: JSON.stringify({
              title: headingTitle.trim(),
            }),
          },
          accessToken
        )

        setSectionHeadings((prev) =>
          prev.map((heading) =>
            heading.id === editingHeading.id ? data.heading : heading
          )
        )
      } else {
        if (!selectedVerse) return

        const data = await rawFetch(
          '/bible-section-headings',
          {
            method: 'POST',
            body: JSON.stringify({
              bookSlug: book,
              chapter: Number(chapter),
              verseStart: selectedVerse.verse,
              title: headingTitle.trim(),
              status: 'published',
            }),
          },
          accessToken
        )

        setSectionHeadings((prev) => [
          ...prev.filter((heading) => heading.verseStart !== selectedVerse.verse),
          data.heading,
        ])
      }

      setHeadingTitle('')
      setEditingHeading(null)
      setHeadingDialogOpen(false)
    } catch (err) {
      console.error('Could not save section heading:', err)
    }
  }


  async function deleteHeading() {
    if (!editingHeading) return

    const confirmed = window.confirm('Delete this section heading?')
    if (!confirmed) return

    try {
      await rawFetch(
        `/bible-section-headings/${editingHeading.id}`,
        {
          method: 'DELETE',
        },
        accessToken
      )

      setSectionHeadings((prev) =>
        prev.filter((heading) => heading.id !== editingHeading.id)
      )

      setHeadingTitle('')
      setEditingHeading(null)
      setHeadingDialogOpen(false)
    } catch (err) {
      console.error('Could not delete section heading:', err)
    }
  }


  const MIN_READER_LOADING_MS = 400

  function wait(ms) {
    return new Promise((resolve) => {
      window.setTimeout(resolve, ms)
    })
  }


  function goToBibleLibrary() {
    navigate('/bible')
  }

  function goToPreviousChapter() {
    const currentChapter = Number(chapter)
    const currentBookIndex = bibleBooks.findIndex((item) => item.slug === book)

    if (currentBookIndex === -1) return

    if (currentChapter > 1) {
      navigate(`/bible/${book}/${currentChapter - 1}`)
      return
    }

    const previousBook = bibleBooks[currentBookIndex - 1]

    if (!previousBook) return

    navigate(`/bible/${previousBook.slug}/${previousBook.chapters}`)
  }

  function goToNextChapter() {
    const currentChapter = Number(chapter)
    const currentBookIndex = bibleBooks.findIndex((item) => item.slug === book)
    const currentBook = bibleBooks[currentBookIndex]

    if (!currentBook) return

    if (currentChapter < currentBook.chapters) {
      navigate(`/bible/${book}/${currentChapter + 1}`)
      return
    }

    const nextBook = bibleBooks[currentBookIndex + 1]

    if (!nextBook) return

    navigate(`/bible/${nextBook.slug}/1`)
  }

  async function openVerseContext(verse) {
    if (!chapterData || !verse) return

    setSelectedReference(`${chapterData.book.name} ${chapterData.chapter}:${verse.verse}`)
    setContextDrawerOpen(true)
    setCommentsLoading(true)

    try {
      const data = await rawFetch(
        `/scripture-context/${chapterData.book.slug}/${chapterData.chapter}/${verse.verse}`,
        {},
        accessToken
      )

      setVerseContext(data.contexts || [])
    } catch (err) {
      setVerseContext([])
    }

    try {
      const commentData = await rawFetch(
        `/verse-comments/${verse.id}`,
        {},
        accessToken
      )

      setVerseComments(commentData.comments || [])
    } catch (err) {
      console.error('Could not load verse comments:', err)
      setVerseComments([])
    } finally {
      setCommentsLoading(false)
    }
  }

  async function saveVerseHighlight(verse, color) {
    if (!verse) return

    setHighlightColor(color)

    setSavedHighlights((prev) => ({
      ...prev,
      [verse.id]: color,
    }))

    try {
      await rawFetch(
        `/verse-highlights/${verse.id}`,
        {
          method: 'PUT',
          body: JSON.stringify({ color }),
          showFlash: false,
        },
        accessToken
      )
    } catch (err) {
      console.error('Could not save verse highlight:', err)
    }
  }

  async function removeVerseHighlight(verse) {
    if (!verse) return

    setSavedHighlights((prev) => {
      const next = { ...prev }
      delete next[verse.id]
      return next
    })

    setSelectedVerse(null)

    try {
      await rawFetch(
        `/verse-highlights/${verse.id}`,
        {
          method: 'DELETE',
          showFlash: false,
        },
        accessToken
      )
    } catch (err) {
      console.error('Could not remove verse highlight:', err)
    }
  }

  async function toggleSavedVerse(verse) {
    if (!verse) return

    const isSaved = Boolean(savedVerses[verse.id])

    setSavedVerses((prev) => {
      const next = { ...prev }

      if (isSaved) {
        delete next[verse.id]
      } else {
        next[verse.id] = true
      }

      return next
    })

    try {
      await rawFetch(
        `/saved-verses/${verse.id}`,
        {
          method: isSaved ? 'DELETE' : 'POST',
        },
        accessToken
      )
    } catch (err) {
      console.error('Could not toggle saved verse:', err)

      setSavedVerses((prev) => {
        const next = { ...prev }

        if (isSaved) {
          next[verse.id] = true
        } else {
          delete next[verse.id]
        }

        return next
      })
    }
  }

  function handleVerseTap(verse) {
    const savedColor = savedHighlights[verse.id]

    if (tapTimerRef.current) {
      clearTimeout(tapTimerRef.current)
      tapTimerRef.current = null

      setSelectedVerse(verse)
      setHighlightColor(savedColor || 'yellow')
      scrollSelectedVerseIntoView(verse)
      openVerseContext(verse)
      return
    }

    setSelectedVerse(verse)
    setHighlightColor(savedColor || 'yellow')
    scrollSelectedVerseIntoView(verse)

    tapTimerRef.current = setTimeout(() => {
      tapTimerRef.current = null
    }, 280)
  }


  function scrollSelectedVerseIntoView(verse) {
    window.setTimeout(() => {
      const verseElement = document.getElementById(`verse-${verse.id}`)

      if (!verseElement) return

      verseElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }, 80)
  }


  return (
    <>
      <Box
        sx={{
          width: '100%',
          mx: 0,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            px: {
              xs: 2,
              sm: 3,
            },
            pb: {
              xs: 10,
              sm:  12,
            },
            borderRadius: 1,
            bgcolor: 'background.paper',
          }}
        >
          <Stack spacing={2}>
            <Paper
              elevation={0}
              sx={{
              position: 'fixed',
              py: 1.25,
              left: 0,
              right: 0,
              bottom: 56,
              zIndex: 10,
              borderRadius: 0,
              px: 1,
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(18, 18, 18, 0.99)'
                  : 'rgb(252, 252, 252)',
                            }}
            >
              <Box sx={{ position: 'relative' }}>
                <IconButton
                  size="small"
                  onClick={goToBibleLibrary}
                  aria-label="Back to Bible books"
                  sx={{
                    position: 'absolute',
                    left: -6,
                    top: '50%',
                    zIndex: 2,
                    transform: 'translateY(-50%)',
                    width: 34,
                    height: 34,
                    color: 'text.secondary',
                  }}
                >
                  <ArrowBackIosNewOutlinedIcon sx={{ fontSize: '1rem' }} />
                </IconButton>

                <IconButton
                  size="small"
                  onClick={() => setReaderOptionsOpen(true)}
                  aria-label="Open reader options"
                  sx={{
                    position: 'absolute',
                    right: -6,
                    top: '50%',
                    zIndex: 2,
                    transform: 'translateY(-50%)',
                    width: 34,
                    height: 34,
                    color: 'text.secondary',
                  }}
                >
                  <MoreVertIcon sx={{ fontSize: '1.15rem' }} />
                </IconButton>

                <Stack
                  direction="row"
                  sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    minHeight: 42,
                    px: {
                      xs: 4,
                      sm: 6,
                    },
                  }}
                >

                  <IconButton
                    size="small"
                    onClick={toggleChapterAudio}
                    aria-label={audioPlaying ? 'Pause chapter audio' : 'Play chapter audio'}
                    sx={{
                      color: 'primary.main',
                    }}
                  >
                    {audioPlaying ? (
                      <PauseIcon fontSize="small" />
                    ) : (
                      <PlayArrowIcon fontSize="small" />
                    )}
                  </IconButton>

                  <IconButton
                    size="small"
                    onClick={goToPreviousChapter}
                    aria-label="Previous chapter"
                    sx={{
                      color: 'text.secondary',
                    }}
                  >
                    ←
                  </IconButton>

                  <Box
                    sx={{
                      textAlign: 'center',
                      flexShrink: 0,
                      px: 2,
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight={800} noWrap>
                      {chapterData
                        ? `${chapterData.book.name} ${chapterData.chapter}`
                        : 'Loading...'}
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                      {chapterData?.translation?.code || 'WEB'}
                    </Typography>

                  </Box>

                  <IconButton
                    size="small"
                    onClick={goToNextChapter}
                    aria-label="Next chapter"
                    sx={{
                      color: 'text.secondary',
                    }}
                  >
                    →
                  </IconButton>
                </Stack>
              </Box>
            </Paper>

            {chapterLoading ? (
              <Stack
                spacing={1.25}
                sx={{
                  pt: 2,
                  px: 0.5,
                  pb: 4,
                }}
              >
                {[
                  '94%',
                  '88%',
                  '96%',
                  '76%',
                  '92%',
                  '84%',
                  '98%',
                  '70%',
                  '90%',
                  '82%',
                ].map((width, index) => (
                  <Skeleton
                    key={index}
                    animation="wave"
                    variant="text"
                    width={width}
                    height={28}
                    sx={{
                      transform: 'none',
                      borderRadius: 0.5,
                    }}
                  />
                ))}
              </Stack>
            ) : !chapterData ? (
              <Typography color="text.secondary">
                Could not load Scripture.
              </Typography>
            ) : (
            <Box>
              <Box
                sx={{
                  textAlign: 'center',
                  pt: 1,
                  pb: 3,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {chapterData.book.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: 0.5,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  Chapter {chapterData.chapter}
                </Typography>
              </Box>
              <Box
                sx={{
                  lineHeight: currentPreset.lineHeight,

                  fontSize: {
                    xs: `${currentPreset.fontSize}px`,
                    sm: `${currentPreset.fontSize + 1}px`,
                  },

                  letterSpacing: `${currentPreset.letterSpacing}px`,

                  color: 'text.primary',

                  textAlign: 'left',

                  userSelect: 'none',

                  pb: `${currentPreset.paragraphSpacing}px`,
                }}
              >
                {chapterData.verses?.map((verse) => {
                  const isSelected = selectedVerse?.id === verse.id
                  const savedColor = savedHighlights[verse.id]

                  const sectionHeading = sectionHeadings.find(
                    (heading) => heading.verseStart === verse.verse
                  )

                  return (
                    <Box component="span" key={verse.id}>
                      {sectionHeading && (
                        <Box
                          onClick={() => {
                            if (user?.role !== 'ADMIN') return

                            setEditingHeading(sectionHeading)
                            setHeadingTitle(sectionHeading.title)
                            setHeadingDialogOpen(true)
                          }}
                          sx={{
                            mt: 4,
                            mb: .5,
                            cursor: user?.role === 'ADMIN' ? 'pointer' : 'default',
                          }}
                        >
                            <Typography
                              sx={{
                                fontSize: `${currentPreset.fontSize * 0.95}px`,
                                lineHeight: currentPreset.lineHeight,
                                letterSpacing: `${currentPreset.letterSpacing}px`,
                                fontWeight: 700,
                                color: 'text.secondary',
                              }}
                            >
                              {sectionHeading.title}
                            </Typography>
                          </Box>
                        )}
                        {verse.paragraphStart && (
                          <Box
                            component="span"
                            sx={{
                              display: 'block',
                              height: '1.15rem',
                            }}
                          />
                        )}
                    <Box
                      id={`verse-${verse.id}`}
                      data-verse-id={verse.id}
                      data-verse-number={verse.verse}
                      component="span"
                      onClick={(event) => {
                        event.stopPropagation()
                        handleVerseTap(verse)
                      }}
                      sx={{
                        display: verse.blockType === 'poetry'
                          ? 'block'
                          : 'inline',

                        pl:
                          verse.blockType === 'poetry'
                            ? `${(verse.blockLevel || 1) * 1.2}rem`
                            : 0,

                        mt: verse.paragraphStart ? 1.8 : 0,
                        cursor: 'pointer',
                        mr: 0.18,

                        bgcolor:
                          getHighlightOption(savedColor)?.textBg || 'transparent',

                        borderRadius: '0.18em',

                        px: '0.04em',

                        py: '0.02em',

                        boxDecorationBreak: 'clone',
                        WebkitBoxDecorationBreak: 'clone',

                        transition:
                          'background-color 160ms ease, opacity 160ms ease, transform 120ms ease',

                        '&:active': {
                          opacity: 0.72,
                          transform: 'scale(0.995)',
                        },
                      }}
                                          >
                      <Typography
                        component="span"
                        variant="caption"
                        color="primary"
                        sx={{
                          p:.05,
                          fontSize: '0.7rem',
                          verticalAlign: 'super',
                          mr: 0.5,
                          fontWeight: savedColor ? 700 : 600,

                          bgcolor: savedColor
                            ? getHighlightOption(savedColor)?.textBg
                            : 'transparent',


                          borderColor: savedColor
                            ? getHighlightOption(savedColor)?.circleBg
                            : 'transparent',

                          px: savedColor ? 0.28 : 0,
                          borderRadius: '0.2em',

                          transition:
                            'background-color 160ms ease, border-color 160ms ease, font-weight 160ms ease',
                        }}
                      >
                        {verse.verse}
                      </Typography>

                      <Box
                        component="span"
                        sx={{
                          textDecoration: isSelected ? 'underline' : 'none',
                          textDecorationColor: isSelected
                            ? 'primary.main'
                            : 'transparent',
                          textDecorationThickness: '1.5px',
                          textUnderlineOffset: '0.22em',
                        }}
                      >
                        {verse.text + ' '}
                      </Box>
                    </Box>
                    </Box>
                  )
                })}
              </Box>
              </Box>
            )}
          </Stack>
        </Paper>
      </Box>


      <Box
        sx={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 128,
          zIndex: 20,
          transform:
            Boolean(selectedVerse) && !contextDrawerOpen
              ? 'translateY(0)'
              : 'translateY(100% + 72px)',
          opacity: Boolean(selectedVerse) && !contextDrawerOpen ? 1 : 0,
          pointerEvents:
            Boolean(selectedVerse) && !contextDrawerOpen ? 'auto' : 'none',
          transition:
            'transform 220ms ease, opacity 160ms ease',
        }}
      >
        <Paper
          elevation={0}
          onClick={(event) => event.stopPropagation()}
          sx={{
            px: 2,
            py: 1,
            borderRadius: 0,
            borderTop: '1px solid',
            borderColor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.08)'
                : 'rgba(0,0,0,0.08)',
            bgcolor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(0, 28, 54, 0.96)'
                : 'rgba(235, 246, 255, 0.98)',
            backdropFilter: 'blur(10px)',
            boxShadow: 'none',
          }}
        >
          <Stack
            direction="row"
            spacing={1.25}
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Tooltip title="Close verse tools" placement="left">
              <IconButton
                size="small"
                onClick={() => setSelectedVerse(null)}
                aria-label="Close verse tools"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            {HIGHLIGHT_OPTIONS.map((option) => (
              <Box
                key={option.key}
                sx={{
                  width: 34,
                  height: 34,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  onClick={() => saveVerseHighlight(selectedVerse, option.key)}
                  role="button"
                  aria-label={option.label}
                  sx={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    cursor: 'pointer',
                    bgcolor: option.circleBg,
                    border: '2px solid',
                    borderColor:
                      highlightColor === option.key
                        ? 'text.primary'
                        : 'transparent',
                  }}
                />
              </Box>
            ))}

            <Tooltip title="Remove highlight" placement="left">
              <IconButton
                size="small"
                onClick={() => removeVerseHighlight(selectedVerse)}
                aria-label="Remove highlight"
              >
                <FormatColorResetOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip
              title={savedVerses[selectedVerse?.id] ? 'Remove saved verse' : 'Save verse'}
              placement="left"
            >
              <IconButton
                size="small"
                color={savedVerses[selectedVerse?.id] ? 'primary' : 'default'}
                onClick={() => toggleSavedVerse(selectedVerse)}
                aria-label={
                  savedVerses[selectedVerse?.id] ? 'Remove saved verse' : 'Save verse'
                }
              >
                <BookmarkAddOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            {user?.role === 'ADMIN' && (
              <Tooltip title="Add section heading" placement="top">
                <IconButton
                  size="small"
                  onClick={() => {
                    setEditingHeading(null)
                    setHeadingTitle('')
                    setHeadingDialogOpen(true)
                  }}
                  aria-label="Add section heading"
                >
                  <TitleIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}

            <Tooltip title="Open context" placement="left">
              <IconButton
                size="small"
                color="primary"
                onClick={() => openVerseContext(selectedVerse)}
                aria-label="Open verse context"
              >
                <MenuBookOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Paper>
      </Box>
      <Dialog
        open={headingDialogOpen}
        onClose={() => setHeadingDialogOpen(false)}
        fullWidth
        maxWidth="xs"
      >
      <DialogTitle>
        {editingHeading
          ? 'Edit section heading'
          : `Add heading before ${chapterData?.book?.name} ${chapterData?.chapter}:${selectedVerse?.verse}`}
      </DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            label="Section heading"
            value={headingTitle}
            onChange={(event) => setHeadingTitle(event.target.value)}
            fullWidth
            sx={{ mt: 1 }}
          />
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: 'space-between',
          }}
        >
          <Box>
            {editingHeading && (
              <Button
                color="error"
                onClick={deleteHeading}
              >
                Delete
              </Button>
            )}
          </Box>

          <Stack direction="row" spacing={1}>
            <Button onClick={() => setHeadingDialogOpen(false)}>
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={saveSectionHeading}
              disabled={!headingTitle.trim()}
            >
              Save
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
      <ReaderOptionsDrawer
        open={readerOptionsOpen}
        onClose={() => setReaderOptionsOpen(false)}
      />

      <VerseContextDrawer
        open={contextDrawerOpen}
        onClose={() => setContextDrawerOpen(false)}
        reference={selectedReference}
        topics={verseContext}
        selectedVerse={selectedVerse}
        comments={verseComments}
        commentsLoading={commentsLoading}
        setComments={setVerseComments}
      />

  <audio
    ref={audioRef}
    src={getBibleAudioUrl(book, chapter)}
    onEnded={() => setAudioPlaying(false)}
    preload="metadata"
  />

    </>
  )
}