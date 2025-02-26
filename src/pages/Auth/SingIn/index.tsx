import { zodResolver } from '@hookform/resolvers/zod'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Snackbar from '@mui/material/Snackbar'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import SitemarkIcon from '~/components/AppBar/SitemaskIcon'
import { FormProvider } from '~/components/HookForm/FormProvider'
import { RHFText } from '~/components/HookForm/RHFText'
import { useLogin } from '~/hooks/useAuth'

import { Card } from '../components/styled'
import { ForgotPassword } from './ForgotPassword'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginForm = z.infer<typeof loginSchema>

export const SignIn = () => {
  const navigate = useNavigate()
  const { mutateAsync } = useLogin()

  const [open, setOpen] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error' as 'error' | 'success',
  })

  const methods = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { setError } = methods

  const onSubmit = async (data: LoginForm) => {
    try {
      await mutateAsync(data)

      setSnackbar({
        open: true,
        message: 'Login successful!',
        severity: 'success',
      })
      setTimeout(() => navigate('/'), 1000)
    } catch {
      setSnackbar({
        open: true,
        message: 'Invalid credentials. Please try again.',
        severity: 'error',
      })
      setError('email', { message: 'Invalid credentials' })
      setError('password', { message: 'Invalid credentials' })
    }
  }

  return (
    <Card variant="outlined">
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <SitemarkIcon />
      </Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        Sign in
      </Typography>

      <FormProvider onSubmit={onSubmit} {...methods}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
          }}
        >
          <RHFText name="email" label="Email" placeholder="your@email.com" />
          <RHFText
            name="password"
            label="Password"
            type="password"
            placeholder="••••••"
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link
              component="button"
              type="button"
              onClick={() => setOpen(true)}
              variant="body2"
            >
              Forgot your password?
            </Link>
          </Box>

          <ForgotPassword open={open} handleClose={() => setOpen(false)} />

          <Button type="submit" fullWidth variant="contained">
            Sign in
          </Button>

          <Typography sx={{ textAlign: 'center' }}>
            Don&apos;t have an account?{' '}
            <Link component={RouterLink} to="/auth/signup" variant="body2">
              Sign up
            </Link>
          </Typography>
        </Box>
      </FormProvider>
    </Card>
  )
}
