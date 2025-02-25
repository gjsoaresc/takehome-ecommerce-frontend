import { Stack, Typography } from '@mui/material'

import { Products } from './components/Products'

export const Home = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="h3" align="center" gutterBottom>
        Welcome to Our Store
      </Typography>

      <Products />
    </Stack>
  )
}
