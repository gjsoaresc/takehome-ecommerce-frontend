import { TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

interface Props {
  name: string
  label: string
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
        <TextField
          {...field}
          fullWidth
          label={label}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  )
}
