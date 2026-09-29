import { useEffect, useState } from 'react'
import {
  Alert,
  Snackbar,
} from '@mui/material'
import { subscribeToFlash } from '@/utils/flashBus'

export default function FlashContext() {
  const [flash, setFlash] = useState(null)

  useEffect(() => {
    return subscribeToFlash((nextFlash) => {
      setFlash(nextFlash)
    })
  }, [])

  function handleClose() {
    setFlash(null)
  }

  return (
    <Snackbar
      open={Boolean(flash)}
      autoHideDuration={flash?.autoHideDuration || 4000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      sx={{
        zIndex: (theme) => theme.zIndex.modal + 10,
      }}
    >
      <Alert
        severity={flash?.severity || 'info'}
        onClose={handleClose}
        sx={{
          width: '100%',
        }}
      >
        {flash?.message}
      </Alert>
    </Snackbar>
  )
}