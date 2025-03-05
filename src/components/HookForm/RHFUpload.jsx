import { Box, FormHelperText, FormLabel } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Upload } from '../upload'

const RHFUpload = ({ name, label, multiple, accept, maxSize, onDrop, disabled }) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box>
          <FormLabel>{label}</FormLabel>
          <Upload
            multiple={multiple}
            accept={accept}
            maxSize={maxSize}
            files={field.value}
            disabled={disabled}
            onDrop={(acceptedFiles) => {
              const files = acceptedFiles
              if (onDrop) {
                onDrop(acceptedFiles)
              }
              field.onChange(files)
            }}
            error={!!error}
          />
          {error && (
            <FormHelperText error sx={{ px: 2 }}>
              {error.message}
            </FormHelperText>
          )}
        </Box>
      )}
    />
  )
}

RHFUpload.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  accept: PropTypes.object,
  maxSize: PropTypes.number,
  onDrop: PropTypes.func,
  disabled: PropTypes.bool,
}

RHFUpload.defaultProps = {
  label: '',
  multiple: false,
  accept: {},
  maxSize: 3145728, // 3 MB
  disabled: false,
}

export default RHFUpload 