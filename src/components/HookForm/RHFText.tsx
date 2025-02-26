import { FormControl, FormLabel, TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

type Props = {
  name: string
  label?: string
  placeholder?: string
  type?: string
  disabled?: boolean
}

export const RHFText = ({
  name,
  label,
  placeholder,
  type = 'text',
  disabled,
}: Props) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl>
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <TextField
            {...field}
            fullWidth
            variant="outlined"
            placeholder={placeholder}
            type={type}
            disabled={disabled}
            error={!!error}
            helperText={error?.message}
          />
        </FormControl>
      )}
    />
  )
}
