import { Box, Stack, styled } from '@mui/material'
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
  padding: 18,
  mb: 4,
  backgroundColor: theme.palette.background.paper,
  borderRadius: 8,

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
  categories: string[]
  brands: string[]
  maxPrice: number
}

export const ProductFilters = ({
  onFilterChange,
  categories,
  brands,
  maxPrice,
}: ProductFiltersProps) => {
  const methods = useForm<FilterForm>({
    defaultValues: {
      search: '',
      category: '',
      brand: '',
      priceRange: [0, maxPrice],
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
    <FormProvider {...methods}>
      <StyledBox>
        <Stack spacing={2}>
          <RHFText
            name="search"
            label="Search"
            placeholder="Search for products..."
          />

          <RHFSelect
            name="category"
            label="Category"
            options={[
              { value: '', label: 'All' },
              ...categories.map((cat) => ({ value: cat, label: cat })),
            ]}
          />

          <RHFSelect
            name="brand"
            label="Brand"
            options={[
              { value: '', label: 'All' },
              ...brands.map((brand) => ({ value: brand, label: brand })),
            ]}
          />

          <RHFSlide
            name="priceRange"
            label="Price Range"
            min={0}
            max={1000}
            step={10}
          />
        </Stack>
      </StyledBox>
    </FormProvider>
  )
}
