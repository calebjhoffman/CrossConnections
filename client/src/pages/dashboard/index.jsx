import { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { useAuth } from '@/context/AuthContext'
import { rawFetch } from '@/utils/fetcher'

const HIGHLIGHT_GROUPS = [
  {
    key: 'none',
    label: 'Saved Only',
    borderColor: 'rgba(158, 158, 158, 0.8)',
    bgColor: 'rgba(158, 158, 158, 0.06)',
  },
  {
    key: 'yellow',
    label: 'Yellow Highlights',
    borderColor: 'rgba(255, 193, 7, 0.9)',
    bgColor: 'rgba(255, 193, 7, 0.08)',
  },
  {
    key: 'blue',
    label: 'Blue Highlights',
    borderColor: 'rgba(33, 150, 243, 0.85)',
    bgColor: 'rgba(33, 150, 243, 0.06)',
  },
  {
    key: 'green',
    label: 'Green Highlights',
    borderColor: 'rgba(76, 175, 80, 0.85)',
    bgColor: 'rgba(76, 175, 80, 0.06)',
  },
]

export default function Dashboard() {
  const { user, logout, accessToken } = useAuth()

  const [savedVerses, setSavedVerses] = useState([])
  const [savedLoading, setSavedLoading] = useState(true)

  useEffect(() => {
    async function loadSavedVerses() {
      try {
        const data = await rawFetch('/saved-verses', {}, accessToken)
        setSavedVerses(data.savedVerses || [])
      } catch (err) {
        console.error('Could not load saved verses:', err)
        setSavedVerses([])
      } finally {
        setSavedLoading(false)
      }
    }

    loadSavedVerses()
  }, [accessToken])

  const groupedSavedVerses = useMemo(() => {
    return HIGHLIGHT_GROUPS.map((group) => ({
      ...group,
      verses: savedVerses.filter((savedVerse) => {
      const highlightColor = savedVerse.verse?.userHighlights?.[0]?.color || 'none'
      return highlightColor === group.key
      }),
    }))
  }, [savedVerses])

  async function removeSavedVerse(savedVerse) {
    setSavedVerses((prev) =>
      prev.filter((item) => item.id !== savedVerse.id)
    )

    try {
      await rawFetch(
        `/saved-verses/${savedVerse.verseId}`,
        {
          method: 'DELETE',
        },
        accessToken
      )
    } catch (err) {
      console.error('Could not remove saved verse:', err)
      setSavedVerses((prev) => [savedVerse, ...prev])
    }
  }

  return (
    <Stack spacing={3}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 1,
          borderColor: 'divider',
          background:
            'linear-gradient(135deg, rgba(91,108,255,0.14), rgba(255,255,255,0))',
        }}
      >
        <Stack spacing={2}>
          <Box>
            <Typography variant="overline" color="primary" fontWeight={700}>
              Cross Connections
            </Typography>

            <Typography variant="h4" component="h1" fontWeight={800}>
              Scripture as one connected story
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Welcome {user?.email}
            </Typography>
          </Box>

          <Typography color="text.secondary">
            Your saved verses, recent study activity, and personal Scripture
            connections will live here.
          </Typography>
        </Stack>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Stack spacing={2.5}>
          <Box>
            <Typography variant="h6" fontWeight={800}>
              Saved Verses
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Verses grouped by your highlight color.
            </Typography>
          </Box>

          {savedLoading ? (
            <Box>
              <CircularProgress size={22} />
            </Box>
          ) : savedVerses.length === 0 ? (
            <Typography color="text.secondary">
              No saved verses yet.
            </Typography>
          ) : (
            <Stack spacing={3}>
              {groupedSavedVerses.map((group) => {
                if (group.verses.length === 0) return null

                return (
                  <Stack key={group.key} spacing={1.5}>
                    <Typography
                      variant="overline"
                      fontWeight={800}
                      sx={{
                        color: 'text.secondary',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {group.label}
                    </Typography>

                    <Stack spacing={1.25}>
                      {group.verses.map((savedVerse) => {
                        const verse = savedVerse.verse
                        const reference = `${verse.book.name} ${verse.chapter}:${verse.verse}`

                        return (
                          <Box
                            key={savedVerse.id}
                            sx={{
                              py: 1.5,
                              pl: 2,
                              pr: 1,
                              borderLeft: '5px solid',
                              borderColor: group.borderColor,
                              bgcolor: group.bgColor,
                            }}
                          >
                            <Stack spacing={1}>
                              <Stack
                                direction="row"
                                sx={{
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  gap: 1,
                                }}
                              >
                                <Typography
                                  variant="subtitle2"
                                  color="primary"
                                  fontWeight={800}
                                >
                                  {reference}
                                </Typography>

                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => removeSavedVerse(savedVerse)}
                                  aria-label={`Remove saved verse ${reference}`}
                                >
                                  <DeleteOutlineOutlinedIcon fontSize="small" />
                                </IconButton>
                              </Stack>

                              <Typography
                                sx={{
                                  lineHeight: 1.75,
                                  color: 'text.primary',
                                }}
                              >
                                {verse.text}
                              </Typography>

                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {verse.translation.code}
                              </Typography>
                            </Stack>
                          </Box>
                        )
                      })}
                    </Stack>
                  </Stack>
                )
              })}
            </Stack>
          )}
        </Stack>
      </Paper>
    </Stack>
  )
}