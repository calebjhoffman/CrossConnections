import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  APP_FONTS,
  DEFAULT_APP_FONT_KEY,
  READER_PRESETS,
  DEFAULT_READER_PRESET_KEY,
} from '@/constants/readerPresets'

import { useAuth } from '@/context/AuthContext'
import { rawFetch } from '@/utils/fetcher'

const ReaderSettingsContext = createContext()

const READER_PRESET_META_KEY = 'reader_preset'

export function ReaderSettingsProvider({ children }) {
  const { accessToken } = useAuth()

  const [appFont, setAppFont] = useState(DEFAULT_APP_FONT_KEY)
  const [readerPreset, setReaderPresetState] = useState(DEFAULT_READER_PRESET_KEY)
  const [hasLoadedReaderPreset, setHasLoadedReaderPreset] = useState(false)

  useEffect(() => {
    let isMounted = true

    if (!accessToken) {
      setHasLoadedReaderPreset(true)
      return
    }

    async function loadReaderPreset() {
      setHasLoadedReaderPreset(false)

      try {
        const data = await rawFetch(
          `/user-meta/${READER_PRESET_META_KEY}`,
          {
            showFlash: false,
          },
          accessToken
        )

        if (!isMounted) return

        if (data?.value && READER_PRESETS[data.value]) {
          setReaderPresetState(data.value)
        }
      } catch (err) {
        console.error('Could not load reader preset:', err)
      } finally {
        if (isMounted) {
          setHasLoadedReaderPreset(true)
        }
      }
    }

    loadReaderPreset()

    return () => {
      isMounted = false
    }
  }, [accessToken])

  async function setReaderPreset(nextPreset) {
    if (!READER_PRESETS[nextPreset]) return

    setReaderPresetState(nextPreset)

    if (!accessToken) return

    try {
      await rawFetch(
        `/user-meta/${READER_PRESET_META_KEY}`,
        {
          method: 'PUT',
          body: JSON.stringify({
            value: nextPreset,
          }),
          showFlash: false,
        },
        accessToken
      )
    } catch (err) {
      console.error('Could not save reader preset:', err)
    }
  }

  const currentFont =
    APP_FONTS[appFont] ||
    APP_FONTS[DEFAULT_APP_FONT_KEY]

  const currentPreset =
    READER_PRESETS[readerPreset] ||
    READER_PRESETS[DEFAULT_READER_PRESET_KEY]

  const value = useMemo(
    () => ({
      appFont,
      setAppFont,

      readerPreset,
      setReaderPreset,
      hasLoadedReaderPreset,

      currentFont,
      currentPreset,
    }),
    [
      appFont,
      readerPreset,
      hasLoadedReaderPreset,
      currentFont,
      currentPreset,
    ]
  )

  return (
    <ReaderSettingsContext.Provider value={value}>
      {children}
    </ReaderSettingsContext.Provider>
  )
}

export function useReaderSettings() {
  return useContext(ReaderSettingsContext)
}