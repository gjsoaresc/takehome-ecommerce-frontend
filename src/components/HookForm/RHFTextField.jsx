import { TextField } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

const RHFTextField = ({ name, label, type, disabled, multiline, rows }) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type={type}
          label={label}
          disabled={disabled}
          multiline={multiline}
          rows={rows}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  )
}

RHFTextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
}

RHFTextField.defaultProps = {
  label: '',
  type: 'text',
  disabled: false,
  multiline: false,
  rows: 1,
}

export default RHFTextField 