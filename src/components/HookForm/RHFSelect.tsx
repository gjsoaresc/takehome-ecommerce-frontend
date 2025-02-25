import {
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

interface Props {
  name: string
  label?: string
  options: { value: string | number; label: string }[]
  disabled?: boolean
}

export const RHFSelect = ({ name, label, options, disabled }: Props) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Select
            {...field}
            label={label}
            disabled={disabled}
            variant="outlined"
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  )
}
