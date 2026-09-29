import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { useAuth } from '../context/AuthContext'
import AppBottomNav from '@/components/AppBottomNav'

export default function ProtectedLayout({ children }) {
  const { isAuthenticated, authLoading } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()

  if (authLoading) return null

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />
  }

  const getNavValue = () => {
    if (location.pathname.startsWith('/bible')) return 'bible'
    if (location.pathname.startsWith('/timeline')) return 'timeline'
    if (location.pathname.startsWith('/profile')) return 'profile'

    return 'home'
  }

  const handleNavChange = (value) => {
    if (value === 'home') navigate('/')
    if (value === 'bible') navigate('/bible')
    if (value === 'timeline') navigate('/timeline')
    if (value === 'profile') navigate('/profile')
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        pb: 10,
      }}
    >
      <Box
        sx={{
          px: 2,
          py: 2,
          maxWidth: 900,
          mx: 'auto',
          alignItems: 'center',
        }}
      >
        {children}
      </Box>

      <AppBottomNav
        value={getNavValue()}
        onChange={handleNavChange}
      />
    </Box>
  )
}