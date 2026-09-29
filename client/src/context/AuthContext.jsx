import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { rawFetch } from '../utils/fetcher'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null)
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const handleTokenRefreshed = (event) => {
      setAccessToken(event.detail.accessToken)
    }

    window.addEventListener('tokenRefreshed', handleTokenRefreshed)

    return () => {
      window.removeEventListener('tokenRefreshed', handleTokenRefreshed)
    }
  }, [])

  const loginWithGoogle = async (credential) => {
    const data = await rawFetch('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ credential }),
    })

    setAccessToken(data.accessToken)
    setUser(data.user)

    return data
  }

  const refreshUser = async () => {
    try {
      const data = await rawFetch('/auth/refresh', {
        method: 'POST',
        noRefresh: true,
      })

      setAccessToken(data.accessToken)

      const me = await rawFetch('/auth/me', {}, data.accessToken)

      setUser(me.user)
    } catch {
      setAccessToken(null)
      setUser(null)
    } finally {
      setAuthLoading(false)
    }
  }

  useEffect(() => {
    refreshUser()
  }, [])

  const register = async (formData) => {
    const data = await rawFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(formData),
    })

    setAccessToken(data.accessToken)
    setUser(data.user)

    return data
  }

  const login = async (formData) => {
    const data = await rawFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(formData),
    })

    setAccessToken(data.accessToken)
    setUser(data.user)

    return data
  }

  const logout = async () => {
    await rawFetch('/auth/logout', {
      method: 'POST',
      noRefresh: true,
    })

    setAccessToken(null)
    setUser(null)
  }

  const value = useMemo(() => ({
    accessToken,
    user,
    authLoading,
    register,
    login,
    logout,
    refreshUser,
    loginWithGoogle,
    isAuthenticated: Boolean(user),
  }), [accessToken, user, authLoading])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}