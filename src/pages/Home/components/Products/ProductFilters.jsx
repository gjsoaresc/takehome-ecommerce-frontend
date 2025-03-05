import PropTypes from 'prop-types'
import { Box, Stack, styled } from '@mui/material'
import { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import RHFCheckboxGroup from '../../../../components/HookForm/RHFCheckboxGroup'
import RHFSelect from '../../../../components/HookForm/RHFSelect'
import RHFSlide from '../../../../components/HookForm/RHFSlide'
import { useDebounce } from '../../../../hooks/useDebounce'

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

const ProductFilters = ({
  onFilterChange, 
  categories,
  brands,
  colors,
  shoeSizes,
}) => {
  const methods = useFormContext()

  const { control } = methods
  const watchedFilters = useWatch({ control })
  const debouncedFilters = useDebounce(
    watchedFilters,
    500,
  )

  useEffect(() => {
    onFilterChange(debouncedFilters)
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

        {colors?.length > 0 && (
          <RHFCheckboxGroup
            name="colors"
            label="Color"
            options={colors.map((color) => ({ value: color, label: color }))}
          />
        )}

        {shoeSizes?.length > 0 && (
          <RHFSelect
            name="shoeSizes"
            label="Size"
            multiple
            options={shoeSizes.map((size) => ({ value: size, label: size }))}
          />
        )}

        {categories?.length > 0 && (
          <RHFSelect
            name="categories"
            label="Category"
            multiple
            options={categories.map((cat) => ({ value: cat, label: cat }))}
          />
        )}

        {brands?.length > 0 && (
          <RHFSelect
            name="brands"
            label="Brand"
            multiple
            options={brands.map((brand) => ({ value: brand, label: brand }))}
          />
        )}
      </Stack>
    </StyledBox>
  )
}

ProductFilters.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  brands: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired,
  shoeSizes: PropTypes.array.isRequired,
}

export default ProductFilters