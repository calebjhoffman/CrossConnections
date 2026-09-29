import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PublicLayout({ children }) {
  const { isAuthenticated, authLoading } = useAuth()

  if (authLoading) return null

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}