import { Stack } from '@mui/material'

import { Products } from './components/Products'

export const Home = () => {
  return (
    <Stack spacing={2} sx={{ pt: 4 }}>
      <Products />
    </Stack>
  )
}
