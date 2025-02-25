import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import {
  Box,
  Chip,
  Container,
  IconButton,
  Pagination,
  Typography,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useState } from 'react'

import { useDebounce } from '~/hooks/useDebounce'
import { Filters, useProducts } from '~/hooks/useProduct'

import { ProductCard } from './ProductCard'
import { ProductSkeleton } from './ProductSkeleton'

export const Products = () => {
  const [filters, setFilters] = useState<Partial<Filters>>({})
  const [page, setPage] = useState(0)
  const debouncedFilters = useDebounce(filters, 500)
  const { data, isLoading } = useProducts(debouncedFilters, page, 10)

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters(newFilters)
    setPage(0)
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Products
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'start', md: 'center' },
          gap: 2,
          mb: 3,
        }}
      >
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Chip
            label="All"
            onClick={() => handleFilterChange({ category: '' })}
            variant={filters.category ? 'outlined' : 'filled'}
          />
          <Chip
            label="Electronics"
            onClick={() => handleFilterChange({ category: 'electronics' })}
            variant={filters.category === 'electronics' ? 'filled' : 'outlined'}
          />
          <Chip
            label="Clothing"
            onClick={() => handleFilterChange({ category: 'clothing' })}
            variant={filters.category === 'clothing' ? 'filled' : 'outlined'}
          />
          <Chip
            label="Shoes"
            onClick={() => handleFilterChange({ category: 'shoes' })}
            variant={filters.category === 'shoes' ? 'filled' : 'outlined'}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SearchRoundedIcon sx={{ color: 'text.primary' }} />
          <Typography variant="body2">Search Products</Typography>
          <IconButton size="small" aria-label="RSS feed">
            <RssFeedRoundedIcon />
          </IconButton>
        </Box>
      </Box>

      {isLoading ? (
        <ProductSkeleton />
      ) : (
        <Grid container spacing={2} columns={12}>
          {data?.content.map((product) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={data?.totalPages || 1}
          page={page + 1}
          onChange={(_, newPage) => setPage(newPage - 1)}
          color="primary"
        />
      </Box>
    </Container>
  )
}
