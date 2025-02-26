import { Box, Stack, styled } from '@mui/material'
import { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { RHFCheckboxGroup } from '~/components/HookForm/RHFCheckboxGroup'
import { RHFSelect } from '~/components/HookForm/RHFSelect'
import { RHFSlide } from '~/components/HookForm/RHFSlide'
import { useDebounce } from '~/hooks/useDebounce'
import { Filters } from '~/hooks/useProduct'

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

type ProductFiltersProps = {
  onFilterChange: (filters: Filters) => void
  categories: string[]
  brands: string[]
  colors: string[]
  shoeSizes: string[]
}

export const ProductFilters = ({
  onFilterChange,
  categories,
  brands,
  colors,
  shoeSizes,
}: ProductFiltersProps) => {
  const methods = useFormContext<Filters>()

  const { control } = methods
  const watchedFilters = useWatch({ control })
  const debouncedFilters = useDebounce<typeof watchedFilters>(
    watchedFilters,
    500,
  )

  useEffect(() => {
    onFilterChange(debouncedFilters as Filters)
  }, [debouncedFilters, onFilterChange])

  return (
    <StyledBox>
      <Stack spacing={2}>
        <RHFSlide
          name="priceRange"
          label="Price Range"
          min={0}
          max={1000}
          step={10}
        />

        <RHFSelect
          name="colors"
          label="Colors"
          options={colors.map((color) => ({ value: color, label: color }))}
          multiple
        />

        <RHFSelect
          name="shoeSizes"
          label="Shoe Sizes"
          options={shoeSizes.map((size) => ({ value: size, label: size }))}
          multiple
        />

        <RHFCheckboxGroup
          name="categories"
          label="Categories"
          options={categories.map((cat) => ({ value: cat, label: cat }))}
        />

        <RHFCheckboxGroup
          name="brands"
          label="Brands"
          options={brands.map((brand) => ({ value: brand, label: brand }))}
        />
      </Stack>
    </StyledBox>
  )
}
