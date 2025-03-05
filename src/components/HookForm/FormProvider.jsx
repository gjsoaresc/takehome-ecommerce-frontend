import PropTypes from 'prop-types'
import React from 'react'
import { FormProvider as RHFProvider } from 'react-hook-form'

const FormProvider = ({ children, onSubmit, ...methods }) => {
  return (
    <RHFProvider {...methods}>
      <form onSubmit={onSubmit ? methods.handleSubmit(onSubmit) : () => {}}>
        {children}
      </form>
    </RHFProvider>
  )
}

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  control: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  getValues: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
}

export default FormProvider
