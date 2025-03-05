import { createTheme, ThemeProvider } from '@mui/material/styles'
import PropTypes from 'prop-types'
import * as React from 'react'

import { dataDisplayCustomizations } from './customizations/dataDisplay'
import { feedbackCustomizations } from './customizations/feedback'
import { inputsCustomizations } from './customizations/inputs'
import { navigationCustomizations } from './customizations/navigation'
import { surfacesCustomizations } from './customizations/surfaces'
import { colorSchemes, shadows, shape, typography } from './themePrimitives'

export const AppTheme = (props) => {
  const { children, disableCustomTheme, themeComponents } = props
  const theme = React.useMemo(() => {
    return disableCustomTheme
      ? {}
      : createTheme({
          cssVariables: {
            colorSchemeSelector: 'data-mui-color-scheme',
            cssVarPrefix: 'template',
          },
          colorSchemes,
          typography,
          shadows,
          shape,
          components: {
            ...inputsCustomizations,
            ...dataDisplayCustomizations,
            ...feedbackCustomizations,
            ...navigationCustomizations,
            ...surfacesCustomizations,
            ...themeComponents,
          },
        })
  }, [disableCustomTheme, themeComponents])
  if (disableCustomTheme) {
    return <React.Fragment>{children}</React.Fragment>
  }
  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  )
}

AppTheme.propTypes = {
  children: PropTypes.node.isRequired,
  disableCustomTheme: PropTypes.bool,
  themeComponents: PropTypes.object,
}

AppTheme.defaultProps = {
  disableCustomTheme: false,
  themeComponents: {},
}
