import {
  Box,
  Drawer,
  Stack,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function ChapterPickerDrawer({
  open,
  onClose,
  book,
}) {
  const navigate = useNavigate()

  if (!book) return null

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            px: 1,
            pt: 2.5,
            pb: 3,
            maxHeight: '78vh',
          },
        },
      }}
    >
      <Stack spacing={3}>
        <Box sx={{ px: 1 }}>
          <Typography variant="overline" color="primary" fontWeight={700}>
            Bible
          </Typography>

          <Typography variant="h5" fontWeight={800}>
            {book.name}
          </Typography>

          <Typography color="text.secondary">
            Choose a chapter
          </Typography>
        </Box>

        <Box
          sx={{
            px: 1,
            pb: 1,
            pt:2,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap:1,
            overflowY: 'auto',
            maxHeight: '52vh',
          }}
        >
          {Array.from({ length: book.chapters }).map((_, index) => {
            const chapter = index + 1

            return (
              <Box
                key={chapter}
                onClick={() => {
                  onClose()

                  window.setTimeout(() => {
                    navigate(`/bible/${book.slug}/${chapter}`)
                  }, 220)
                }}
                sx={{
                  p:3,
                  height: 60,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  userSelect: 'none',
                  fontSize: '1.02rem',
                  fontWeight: 700,
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderRadius: 1,
                  borderColor: 'divider',
                  marginTop: '-1px',
                  marginLeft: '-1px',
                  transition:
                    'background-color 160ms ease, border-color 160ms ease',
                  '&:hover': {
                    bgcolor: 'action.hover',
                    borderColor: 'primary.main',
                    zIndex: 1,
                    position: 'relative',
                  },
                  '&:active': {
                    bgcolor: 'action.selected',
                  },
                }}
              >
                {chapter}
              </Box>
            )
          })}
        </Box>
      </Stack>
    </Drawer>
  )
}