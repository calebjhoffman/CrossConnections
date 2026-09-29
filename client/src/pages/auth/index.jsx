import { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useAuth } from '../../context/AuthContext'

export default function AuthPage() {
  const { login, register, loginWithGoogle, user, logout } = useAuth()

  const [mode, setMode] = useState('login')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  })
  const [message, setMessage] = useState('')

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')

    try {
      if (mode === 'login') {
        await login({
          email: formData.email,
          password: formData.password,
        })
        setMessage('Logged in successfully')
      } else {
        await register(formData)
        setMessage('Account created successfully')
      }
    } catch (err) {
      setMessage(err.message)
    }
  }

  if (user) {
    return (
      <Container maxWidth="sm">
        <Paper sx={{ mt: 8, p: 4 }}>
          <Stack spacing={2}>
            <Typography variant="h4">Cross Connections</Typography>
            <Alert severity="success">Logged in as {user.email || user.userId}</Alert>
            <Button variant="contained" onClick={logout}>
              Logout
            </Button>
          </Stack>
        </Paper>
      </Container>
    )
  }

  return (
    <Container maxWidth="sm">
      <Paper sx={{ mt: 8, p: 4 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Typography variant="h4">Cross Connections</Typography>

            <Typography variant="body1">
              {mode === 'login' ? 'Log in to continue' : 'Create your account'}
            </Typography>

            {mode === 'register' && (
              <>
                <TextField label="First name" name="firstName" value={formData.firstName} onChange={handleChange} />
                <TextField label="Last name" name="lastName" value={formData.lastName} onChange={handleChange} />
              </>
            )}

            <TextField label="Email" name="email" value={formData.email} onChange={handleChange} />
            <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />

            {message && <Alert severity={message.includes('success') ? 'success' : 'info'}>{message}</Alert>}

            <Button type="submit" variant="contained">
              {mode === 'login' ? 'Login' : 'Register'}
            </Button>

            <Button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            >
              {mode === 'login' ? 'Need an account?' : 'Already have an account?'}
            </Button>
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  await loginWithGoogle(credentialResponse.credential)
                  setMessage('Logged in with Google successfully')
                } catch (err) {
                  setMessage(err.message)
                }
              }}
              onError={() => {
                setMessage('Google login failed')
              }}
            />
          </Stack>
        </Box>
      </Paper>
    </Container>
  )
}