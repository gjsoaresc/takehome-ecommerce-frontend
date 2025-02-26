import {
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

type Props = {
  name: string
  label?: string
  options: { value: string | number; label: string }[]
  disabled?: boolean
  multiple?: boolean
}

export const RHFSelect = ({
  name,
  label,
  options,
  disabled,
  multiple,
}: Props) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Select
            variant="outlined"
            label={label}
            disabled={disabled}
            multiple={multiple}
            {...field}
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
