import {
  Drawer,
  Box,
  Stack,
  Typography,
  Divider,
} from '@mui/material'

import { READER_PRESETS } from '@/constants/readerPresets'

import { useReaderSettings } from '@/context/ReaderSettingsContext'

export default function ReaderOptionsDrawer({
  open,
  onClose,
}) {
  const {
    readerPreset,
    setReaderPreset,
  } = useReaderSettings()

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            pb: 5,
            px: 2,
            pt: 1.5,
            minHeight: '42vh',
          },
        },
      }}
    >
      <Stack spacing={2.5}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 0.5,
          }}
        >
          <Box
            sx={{
              width: 42,
              height: 4,
              borderRadius: 999,
              bgcolor: 'action.disabled',
            }}
          />
        </Box>

        <Box>
          <Typography
            variant="h6"
            fontWeight={800}
          >
            Reader Options
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Customize your reading experience.
          </Typography>
        </Box>

        <Divider />

        <Stack spacing={1.15}>
          <Typography
            variant="subtitle2"
            fontWeight={800}
            sx={{
              px: 0.25,
            }}
          >
            Reading preset
          </Typography>

          <Stack spacing={1}>
            {Object.entries(READER_PRESETS).map(([key, preset]) => {
              const selected = readerPreset === key

              return (
                <Box
                  key={key}
                  onClick={() => setReaderPreset(key)}
                  sx={{
                    px: 1,
                    py: 1,
                    cursor: 'pointer',
                    borderRadius: 1,

                    borderBottom: '1px solid',
                    borderColor: selected
                      ? 'primary.main'
                      : 'divider',

                    bgcolor: selected
                      ? 'action.selected'
                      : 'transparent',

                    transition: `
                      background-color 220ms ease,
                      border-color 220ms ease,
                      transform 120ms ease
                    `,

                    '&:active': {
                      transform: 'scale(0.992)',
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1.25}
                    sx={{
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box>
                      <Typography
                        fontWeight={800}
                        sx={{
                          fontSize: '0.95rem',
                          transition: 'color 220ms ease',
                        }}
                      >
                        {preset.label}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          lineHeight: 1.35,
                        }}
                      >
                        {preset.description}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        width: 22,
                        height: 22,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          opacity: selected ? 1 : 0,

                          transform: selected
                            ? 'scale(1)'
                            : 'scale(0.4)',

                          transition: `
                            opacity 800ms ease,
                            transform 240ms cubic-bezier(0.22, 1, 0.36, 1)
                          `,
                        }}
                      >
                        <Typography
                          color="primary"
                          fontWeight={900}
                          sx={{
                            fontSize: '1rem',
                            lineHeight: 1,
                          }}
                        >
                          ✓
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                </Box>
              )
            })}
          </Stack>
        </Stack>
      </Stack>
    </Drawer>
  )
}