import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { capitalize } from '../../lib/utils'

const RHFCheckboxGroup = ({ name, label, options, disabled }) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value = [], onChange }, fieldState: { error } }) => {
        const handleCheckboxChange = (checkedValue) => {
          const updatedValues = value.includes(checkedValue)
            ? value.filter((v) => v !== checkedValue)
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

RHFCheckboxGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  disabled: PropTypes.bool,
}

RHFCheckboxGroup.defaultProps = {
  label: '',
  disabled: false,
}

export default RHFCheckboxGroup
