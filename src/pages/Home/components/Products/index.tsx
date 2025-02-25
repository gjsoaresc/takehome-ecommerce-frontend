import { Sort } from '@mui/icons-material'
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  Stack,
  Typography,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useCallback, useMemo, useRef, useState } from 'react'

import { useDebounce } from '~/hooks/useDebounce'
import { Filters, useProducts } from '~/hooks/useProduct'

import { ProductCard } from './ProductCard'
import { ProductFilters } from './ProductFilters'
import { ProductSkeleton } from './ProductSkeleton'

export const Products = () => {
  const [filters, setFilters] = useState<Partial<Filters>>({})
  const [page, setPage] = useState(0)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [sort, setSort] = useState<string>('price-asc')

  const prevFiltersRef = useRef(filters)

  const debouncedFilters = useDebounce({ ...filters, sort }, 500)
  const { data, isLoading } = useProducts(debouncedFilters, page, 10)

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSortChange = (newSort: string) => {
    setSort(newSort)
    handleClose()
  }

  const handleFilterChange = useCallback((newFilters: Partial<Filters>) => {
    setFilters((prevFilters) => {
      if (JSON.stringify(prevFilters) !== JSON.stringify(newFilters)) {
        prevFiltersRef.current = newFilters
        setPage(0)
      }
      return newFilters
    })
  }, [])

  const paginatedData = useMemo(() => data?.content || [], [data?.content])
  const totalPages = useMemo(
    () => data?.pagination.totalPages || 1,
    [data?.pagination.totalPages],
  )

  return (
    <Stack spacing={4}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4" gutterBottom>
          Products
        </Typography>

        <Stack spacing={1} direction="row">
          <IconButton
            aria-controls={open ? 'sort-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <Sort />
          </IconButton>
          <Menu
            id="sort-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={() => handleSortChange('price-asc')}>
              Price: Low to High
            </MenuItem>
            <MenuItem onClick={() => handleSortChange('price-desc')}>
              Price: High to Low
            </MenuItem>
            <MenuItem onClick={() => handleSortChange('name-asc')}>
              Name: A to Z
            </MenuItem>
            <MenuItem onClick={() => handleSortChange('name-desc')}>
              Name: Z to A
            </MenuItem>
          </Menu>
        </Stack>
      </Box>

      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, sm: 3 }}>
          <ProductFilters
            onFilterChange={handleFilterChange}
            categories={data?.filters.categories || []}
            brands={data?.filters.brands || []}
            maxPrice={data?.filters.maxPrice || 1000}
          />
        </Grid>

        {isLoading ? (
          <ProductSkeleton />
        ) : (
          <Grid container size={{ xs: 12, sm: 9 }} spacing={2}>
            {paginatedData.map((product) => (
              <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={totalPages}
          page={page + 1}
          onChange={(_, newPage) => setPage(newPage - 1)}
          color="primary"
        />
      </Box>
    </Stack>
  )
}
