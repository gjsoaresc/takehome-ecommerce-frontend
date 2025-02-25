import { Box, styled } from '@mui/material'
import { Grid } from '@mui/system'
import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import { FormProvider } from '~/components/HookForm/FormProvider'
import { RHFSelect } from '~/components/HookForm/RHFSelect'
import { RHFSlide } from '~/components/HookForm/RHFSlide'
import { RHFText } from '~/components/HookForm/RHFText'
import { useDebounce } from '~/hooks/useDebounce'

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 12,
  mb: 4,
  backgroundColor: theme.palette.background.paper,

  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
}))

interface FilterForm {
  search: string
  category: string
  brand: string
  priceRange: number[]
}

interface ProductFiltersProps {
  onFilterChange: (filters: FilterForm) => void
}

export const ProductFilters = ({ onFilterChange }: ProductFiltersProps) => {
  const methods = useForm<FilterForm>({
    defaultValues: {
      search: '',
      category: '',
      brand: '',
      priceRange: [0, 1000],
    },
  })

  const { control } = methods
  const watchedFilters = useWatch({ control })
  const debouncedFilters = useDebounce<typeof watchedFilters>(
    watchedFilters,
    500,
  )

  useEffect(() => {
    onFilterChange(debouncedFilters as FilterForm)
  }, [debouncedFilters, onFilterChange])

  return (
    <FormProvider onSubmit={console.log} {...methods}>
      <StyledBox>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <RHFText
              name="search"
              label="Search"
              placeholder="Search for products..."
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <RHFSelect
              name="category"
              label="Category"
              options={[
                { value: '', label: 'All' },
                { value: 'electronics', label: 'Electronics' },
                { value: 'clothing', label: 'Clothing' },
                { value: 'shoes', label: 'Shoes' },
              ]}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <RHFSelect
              name="brand"
              label="Brand"
              options={[
                { value: '', label: 'All' },
                { value: 'Nike', label: 'Nike' },
                { value: 'Adidas', label: 'Adidas' },
                { value: 'Apple', label: 'Apple' },
              ]}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <RHFSlide
              name="priceRange"
              label="Price Range"
              min={0}
              max={1000}
              step={10}
            />
          </Grid>
        </Grid>
      </StyledBox>
    </FormProvider>
  )
}
