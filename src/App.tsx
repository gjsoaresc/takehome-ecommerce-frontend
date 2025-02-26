import { Container, CssBaseline } from '@mui/material'
import { useRoutes } from 'react-router-dom'

import AppBar from './components/AppBar'
import Footer from './components/Footer'
import { routes } from './routes'
import { AppTheme } from './theme/AppTheme'

const App = (props: { disableCustomTheme?: boolean }) => {
  const element = useRoutes(routes)

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppBar />

      <Container maxWidth="lg" sx={{ pt: 12 }}>
        {element}
      </Container>

      <Footer />
    </AppTheme>
  )
}

export default App
