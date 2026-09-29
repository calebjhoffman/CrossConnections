import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useAuth } from '@/context/AuthContext'

export default function ProfilePage() {
  const { user, logout } = useAuth()

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="overline" color="primary" fontWeight={700}>
          Profile
        </Typography>

        <Typography variant="h4" component="h1" fontWeight={800}>
          Profile Settings
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Account settings and personalization will live here.
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Stack spacing={2}>
          <Box>
            <Typography variant="h6" fontWeight={700}>
              Account
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 1 }}>
              {user?.email}
            </Typography>
          </Box>

          <Button
            variant="outlined"
            color="error"
            onClick={logout}
            sx={{ alignSelf: 'flex-start' }}
          >
            Logout
          </Button>
        </Stack>
      </Paper>
    </Stack>
  )
}