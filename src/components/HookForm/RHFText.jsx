import { FormControl, FormLabel, TextField } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

const RHFText = ({ name, label, placeholder, type, disabled }) => {
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

RHFText.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
}

RHFText.defaultProps = {
  label: '',
  placeholder: '',
  type: 'text',
  disabled: false,
}

export default RHFText
