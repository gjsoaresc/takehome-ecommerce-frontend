import { Box, Slider, Typography } from '@mui/material'
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
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Box sx={{ width: '100%' }}>
          <Typography gutterBottom>{label}</Typography>
          <Slider
            {...field}
            min={min}
            max={max}
            step={step}
            valueLabelDisplay="auto"
          />
        </Box>
      )}
    />
  )
}
