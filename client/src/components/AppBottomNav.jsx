import {
  BottomNavigation,
  BottomNavigationAction,
  IconButton,
  Paper,
  Tooltip,
} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import TimelineIcon from '@mui/icons-material/Timeline'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { useColorMode } from '@/context/ColorModeContext'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { rawFetch } from '@/utils/fetcher'


export default function AppBottomNav({ value = 'home', onChange }) {
  const { mode, toggleColorMode } = useColorMode()
  const navigate = useNavigate()
  const { accessToken } = useAuth()

async function goToBible() {
  if (accessToken) {
    try {
      const data = await rawFetch(
        '/user-meta/last_bible_location',
        {
          showFlash: false,
        },
        accessToken
      )

      if (data?.value) {
        const parsed = JSON.parse(data.value)

        if (parsed?.path) {
          navigate(parsed.path)
          return
        }
      }
    } catch (err) {
      console.error('Could not load saved Bible location:', err)
    }
  }

  const saved = localStorage.getItem('cross_connections_last_bible_location')

  if (!saved) {
    navigate('/bible')
    return
  }

  try {
    const parsed = JSON.parse(saved)

    if (parsed.path) {
      navigate(parsed.path)
      return
    }
  } catch {}

  navigate('/bible')
}

  return (
    <Paper
      elevation={8}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        borderRadius: 0,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => onChange?.(newValue)}
        sx={{ flex: 1 }}
      >
        <BottomNavigationAction
          label="Home"
          value="home"
          icon={<DashboardIcon />}
        />

        <BottomNavigationAction
          label="Timeline"
          value="timeline"
          icon={<TimelineIcon />}
        />

        <BottomNavigationAction
          label="Bible"
          value="bible"
          onClick={goToBible}
          icon={<MenuBookIcon />}
        />

        <BottomNavigationAction
          label="Profile"
          value="profile"
          icon={<AccountCircleIcon />}
        />
      </BottomNavigation>

      <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
        <IconButton onClick={toggleColorMode} sx={{ mx: 1 }}>
          {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Tooltip>
    </Paper>
  )
}