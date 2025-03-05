import { Box, FormControl, FormLabel, Slider } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

const RHFSlide = ({ name, label, min, max, step }) => {
  const { control, setValue } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <FormControl>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Box sx={{ mx: 1 }}>
            <Slider
              value={value || [min, max]}
              min={min}
              max={max}
              step={step}
              valueLabelDisplay="auto"
              onChange={(_, newValue) => onChange(newValue)}
              onChangeCommitted={(_, newValue) => setValue(name, newValue)}
            />
          </Box>
        </FormControl>
      )}
    />
  )
}

RHFSlide.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
}

RHFSlide.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
}

export default RHFSlide
