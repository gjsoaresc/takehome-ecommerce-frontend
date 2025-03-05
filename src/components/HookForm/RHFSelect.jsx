import {
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select,
} from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

const RHFSelect = ({ name, label, options, disabled, multiple }) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={multiple ? [] : ''}
      render={({ field: { value = multiple ? [] : '', ...field }, fieldState: { error } }) => (
        <FormControl>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Select
            variant="outlined"
            label={label}
            disabled={disabled}
            multiple={multiple}
            value={value}
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

RHFSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
}

RHFSelect.defaultProps = {
  label: '',
  disabled: false,
  multiple: false,
}

export default RHFSelect
