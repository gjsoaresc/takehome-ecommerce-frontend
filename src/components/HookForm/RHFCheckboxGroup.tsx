import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

import { capitalize } from '~/lib/utils'

type Props = {
  name: string
  label?: string
  options: { value: string | number; label: string }[]
  disabled?: boolean
}

export const RHFCheckboxGroup = ({ name, label, options, disabled }: Props) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value = [], onChange }, fieldState: { error } }) => {
        const handleCheckboxChange = (checkedValue: string | number) => {
          const updatedValues = value.includes(checkedValue)
            ? value.filter((v: string | number) => v !== checkedValue)
            : [...value, checkedValue]
          onChange(updatedValues)
        }

        return (
          <FormControl component="fieldset" error={!!error}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormGroup>
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={value.includes(option.value)}
                      onChange={() => handleCheckboxChange(option.value)}
                      disabled={disabled}
                    />
                  }
                  label={capitalize(option.label)}
                />
              ))}
            </FormGroup>
            {error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        )
      }}
    />
  )
}
