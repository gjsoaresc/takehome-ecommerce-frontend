import { Box, FormControl, FormLabel, Slider } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

interface Props {
  name: string
  label: string
  min?: number
  max?: number
  step?: number
}

export const RHFSlide = ({
  name,
  label,
  min = 0,
  max = 100,
  step = 1,
}: Props) => {
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
