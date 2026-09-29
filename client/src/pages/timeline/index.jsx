import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Collapse,
  Drawer,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { rawFetch } from '@/utils/fetcher'
import { useAuth } from '@/context/AuthContext'

const emptyForm = {
  title: '',
  slug: '',
  summary: '',
  description: '',
  orderIndex: '',
  era: '',
  category: '',
  period: '',
  dateLabel: '',
  startYear: '',
  endYear: '',
  status: 'published',
  passages: [
    {
      book: '',
      chapterStart: '',
      verseStart: '',
      chapterEnd: '',
      verseEnd: '',
      label: '',
    },
  ],
}

export default function TimelinePage() {
  const { accessToken, user } = useAuth()
  const isAdmin = user?.role === 'ADMIN'

  const [eras, setEras] = useState([])
  const [openEraId, setOpenEraId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  async function loadEvents() {
    try {
      setLoading(true)
      setError('')

      const data = await rawFetch('/bible-events', {}, accessToken)
      setEras(data.eras || [])
    } catch (err) {
      console.error('Failed to load timeline eras:', err)
      setError('Timeline could not be loaded.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (accessToken) {
      loadEvents()
    }
  }, [accessToken])

  function updateField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  function updatePassage(field, value) {
    setForm((prev) => ({
      ...prev,
      passages: [
        {
          ...prev.passages[0],
          [field]: value,
        },
      ],
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setSaving(true)

      await rawFetch(
        '/bible-events',
        {
          method: 'POST',
          body: JSON.stringify(form),
        },
        accessToken
      )

      setDrawerOpen(false)
      setForm(emptyForm)
      await loadEvents()
    } catch (err) {
      console.error('Failed to create timeline event:', err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
        <Box>
          <Typography variant="overline" color="primary" fontWeight={700}>
            Timeline
          </Typography>

          <Typography variant="h4" component="h1" fontWeight={800}>
            Biblical Timeline
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Explore Scripture as one connected story through major biblical eras.
          </Typography>
        </Box>

        {isAdmin && (
          <Button variant="contained" onClick={() => setDrawerOpen(true)}>
            Add Event
          </Button>
        )}
      </Stack>

      {loading && (
        <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <CircularProgress size={22} />
            <Typography color="text.secondary">Loading timeline...</Typography>
          </Stack>
        </Paper>
      )}

      {!loading && error && (
        <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid', borderColor: 'error.light' }}>
          <Typography color="error" fontWeight={700}>{error}</Typography>
        </Paper>
      )}

      {!loading && !error && eras.map((era) => {
        const isOpen = openEraId === era.id

        return (
          <Paper
            key={era.id}
            elevation={0}
            sx={{
              overflow: 'hidden',
              borderRadius: 1,
              border: '1px solid',
              borderColor: isOpen ? 'primary.main' : 'divider',
            }}
          >
            <Box
              onClick={() => setOpenEraId((prev) => (prev === era.id ? null : era.id))}
              sx={{
                minHeight: 220,
                p: 3,
                cursor: 'pointer',
                display: 'flex',
                alignitems: 'center',
                justifycontent: 'center',
                backgroundImage: era.imageUrl
                  ? `linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.78)), url(${era.imageUrl})`
                  : 'linear-gradient(135deg, rgba(25,118,210,0.85), rgba(15,23,42,0.95))',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white',
              }}
            >
              <Stack spacing={1.5}>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  <Chip label={era.orderIndex} size="small" sx={{ fontWeight: 800, bgcolor: 'white', color: 'primary.main' }} />
                  {era.dateLabel && <Chip label={era.dateLabel} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.18)', color: 'white' }} />}
                  <Chip label={`${era.events?.length || 0} events`} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.18)', color: 'white' }} />
                </Stack>

                <Typography variant="h4" fontWeight={900}>
                  {era.title}
                </Typography>

                {era.summary && (
                  <Typography sx={{ maxWidth: 720, color: 'rgba(255,255,255,0.86)' }}>
                    {era.summary}
                  </Typography>
                )}
              </Stack>
            </Box>

            <Collapse in={isOpen}>
              <Stack spacing={1.5} sx={{ p: 2 }}>
                {era.events?.map((event) => (
                  <Paper
                    key={event.id}
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Stack spacing={1}>
                      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                        <Chip label={event.orderIndex} color="primary" size="small" sx={{ fontWeight: 700 }} />
                        {event.dateLabel && <Chip label={event.dateLabel} variant="outlined" size="small" />}
                        {event.category && <Chip label={event.category} variant="outlined" size="small" />}
                      </Stack>

                      <Typography variant="h6" fontWeight={800}>
                        {event.title}
                      </Typography>

                      {event.summary && (
                        <Typography color="text.secondary">
                          {event.summary}
                        </Typography>
                      )}

                      {event.passages?.length > 0 && (
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                          {event.passages.map((passage) => (
                            <Chip
                              key={passage.id}
                              label={passage.label || `${passage.book} ${passage.chapterStart}:${passage.verseStart}`}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Stack>
                      )}
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </Collapse>
          </Paper>
        )
      })}

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: { xs: 340, sm: 460 }, p: 3 }}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="h6" fontWeight={800}>
                Add Timeline Event
              </Typography>
              <Typography color="text.secondary" variant="body2">
                Create a chronological Bible event and attach one passage.
              </Typography>
            </Box>

            <TextField label="Title" value={form.title} onChange={(e) => updateField('title', e.target.value)} required />
            <TextField label="Slug" value={form.slug} onChange={(e) => updateField('slug', e.target.value)} required />
            <TextField label="Order Index" type="number" value={form.orderIndex} onChange={(e) => updateField('orderIndex', e.target.value)} required />

            <TextField label="Summary" value={form.summary} onChange={(e) => updateField('summary', e.target.value)} multiline minRows={2} />
            <TextField label="Description" value={form.description} onChange={(e) => updateField('description', e.target.value)} multiline minRows={3} />

            <TextField label="Era" value={form.era} onChange={(e) => updateField('era', e.target.value)} />
            <TextField label="Category" value={form.category} onChange={(e) => updateField('category', e.target.value)} />
            <TextField label="Period" value={form.period} onChange={(e) => updateField('period', e.target.value)} />
            <TextField label="Date Label" value={form.dateLabel} onChange={(e) => updateField('dateLabel', e.target.value)} />

            <Stack direction="row" spacing={2}>
              <TextField label="Start Year" type="number" value={form.startYear} onChange={(e) => updateField('startYear', e.target.value)} />
              <TextField label="End Year" type="number" value={form.endYear} onChange={(e) => updateField('endYear', e.target.value)} />
            </Stack>

            <Typography fontWeight={800} sx={{ pt: 1 }}>
              Passage
            </Typography>

            <TextField label="Book" value={form.passages[0].book} onChange={(e) => updatePassage('book', e.target.value)} required />

            <Stack direction="row" spacing={2}>
              <TextField label="Chapter Start" type="number" value={form.passages[0].chapterStart} onChange={(e) => updatePassage('chapterStart', e.target.value)} required />
              <TextField label="Verse Start" type="number" value={form.passages[0].verseStart} onChange={(e) => updatePassage('verseStart', e.target.value)} required />
            </Stack>

            <Stack direction="row" spacing={2}>
              <TextField label="Chapter End" type="number" value={form.passages[0].chapterEnd} onChange={(e) => updatePassage('chapterEnd', e.target.value)} />
              <TextField label="Verse End" type="number" value={form.passages[0].verseEnd} onChange={(e) => updatePassage('verseEnd', e.target.value)} />
            </Stack>

            <TextField label="Passage Label" value={form.passages[0].label} onChange={(e) => updatePassage('label', e.target.value)} />

            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button onClick={() => setDrawerOpen(false)} disabled={saving}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" disabled={saving}>
                {saving ? 'Saving...' : 'Save Event'}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Drawer>
    </Stack>
  )
}