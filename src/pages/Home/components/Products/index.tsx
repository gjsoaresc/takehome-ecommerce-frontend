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
import { useForm } from 'react-hook-form'

import { FormProvider } from '~/components/HookForm/FormProvider'
import { RHFText } from '~/components/HookForm/RHFText'
import { useDebounce } from '~/hooks/useDebounce'
import { Filters, useProducts } from '~/hooks/useProduct'

import { SORT_OPTIONS } from '../form'
import { ProductCard } from './ProductCard'
import { ProductFilters } from './ProductFilters'
import { ProductSkeleton } from './ProductSkeleton'

export const Products = () => {
  const [filters, setFilters] = useState<Partial<Filters>>({})
  const [page, setPage] = useState(0)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [sort, setSort] = useState<string>('price-asc')

  const prevFiltersRef = useRef(filters)

  const methods = useForm<Filters>({
    defaultValues: {
      search: '',
      categories: [],
      brands: [],
      colors: [],
      shoeSizes: [],
      priceRange: [0, 1000],
    },
  })

  const { formState } = methods
  const hasUserModifiedFilters = formState.isDirty

  const debouncedFilters = useDebounce({ ...filters, sort }, 500)
  const { data, isLoading } = useProducts(debouncedFilters, page, 9)

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

  if (!hasUserModifiedFilters && paginatedData.length <= 0 && !isLoading) {
    return null
  }

  return (
    <FormProvider {...methods}>
      <Stack spacing={4}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" gutterBottom>
            Products
          </Typography>

          <Stack spacing={1} direction="row">
            <RHFText name="search" placeholder="Search for products..." />
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
              {SORT_OPTIONS.map((option) => (
                <MenuItem
                  key={option.value}
                  onClick={() => handleSortChange(option.value)}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Menu>
          </Stack>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
          <Grid size={{ xs: 12, sm: 3 }} sx={{ flexShrink: 0, minWidth: 260 }}>
            <ProductFilters
              onFilterChange={handleFilterChange}
              categories={data?.filters.categories || []}
              brands={data?.filters.brands || []}
              colors={data?.filters.colors || []}
              shoeSizes={data?.filters.sizes || []}
            />
          </Grid>

          {isLoading ? (
            <ProductSkeleton />
          ) : paginatedData.length > 0 ? (
            <Stack spacing={8}>
              <Grid
                container
                spacing={2}
                columns={12}
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'flex-start',
                }}
              >
                {paginatedData.map((product) => (
                  <Grid
                    key={product.id}
                    size={{ xs: 12, sm: 6, md: 4 }}
                    sx={{ alignSelf: 'flex-start' }}
                  >
                    <ProductCard product={product} />
                  </Grid>
                ))}
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
          ) : (
            <Box sx={{ textAlign: 'center', width: '100%', py: 4 }}>
              <Typography variant="h6">
                No products match your filters
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your filters or search term.
              </Typography>
            </Box>
          )}
        </Box>
      </Stack>
    </FormProvider>
  )
}
