import { createContext, useContext, useMemo, useState } from 'react'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'

import {
  APP_FONTS,
  DEFAULT_APP_FONT_KEY,
} from '@/constants/readerPresets'

const ColorModeContext = createContext({
  mode: 'light',
  toggleColorMode: () => {},
})

export function ColorModeProvider({ children }) {
  const [mode, setMode] = useState('light')

  const appFont =
    APP_FONTS[DEFAULT_APP_FONT_KEY] ||
    APP_FONTS.inter

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#5B6CFF',
          },
          background: {
            default: mode === 'light' ? '#F7F7FA' : '#111827',
            paper: mode === 'light' ? '#FFFFFF' : '#1F2937',
          },
        },
        typography: {
          fontFamily: appFont.fontFamily,
        },
        shape: {
          borderRadius: 12,
        },
      }),
    [mode, appFont.fontFamily]
  )

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export function useColorMode() {
  return useContext(ColorModeContext)
}