import { Alert, Box, Button, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

import { useAuth } from '../../contexts/AuthContext'
import { useSeed } from '../../hooks/useSeed'

import { Products } from './components/Products'

export const Home = () => {
  const { isAuthenticated, user } = useAuth()
  const seedMutation = useSeed()
  const [showInstructions, setShowInstructions] = useState(false)

  const canSeed = isAuthenticated && user?.role === 'ADMIN'
  const isMockEnabled = import.meta.env.VITE_USE_MOCK === 'true'

  useEffect(() => {
    const alreadySeeded = localStorage.getItem('seeded')
    if (!alreadySeeded && !isMockEnabled) {
      setShowInstructions(true)
    }
  }, [user, isMockEnabled])

  const handleSeed = async () => {
    await seedMutation.mutateAsync()
    setShowInstructions(false)
  }

  return (
    <Stack spacing={2} sx={{ pt: 4 }}>
      <Stack spacing={2}>
        <Box>
          <Typography variant="h4">Home</Typography>
          <Typography variant="body1">
            Welcome to the home page. Here you can see the list of products.
          </Typography>
          {isMockEnabled && (
            <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
              Running with mock data
            </Typography>
          )}
        </Box>

        {showInstructions && (
          <Alert severity="info" sx={{ mb: 8 }}>
            <Typography variant="body1">
              Sign in as an <strong>ADMIN</strong> using to seed the database.
            </Typography>
            <Typography variant="body2">
              <strong>Email:</strong> admin@example.com
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              <strong>Password:</strong> admin123
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleSeed}
              disabled={seedMutation.isPending || !canSeed}
            >
              {seedMutation.isPending ? 'Seeding...' : 'Seed Database'}
            </Button>
          </Alert>
        )}
      </Stack>

      <Products />
    </Stack>
  )
}
