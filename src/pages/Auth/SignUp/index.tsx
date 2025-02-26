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
import { useRegister } from '~/hooks/useAuth'

import { Card } from '../components/styled'

const signupSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    name: z.string().min(3, 'Name must be at least 3 characters'),
    role: z.enum(['USER', 'ADMIN']),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type SignUpForm = z.infer<typeof signupSchema>

export const SignUp = () => {
  const navigate = useNavigate()
  const { mutateAsync } = useRegister()

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error' as 'error' | 'success',
  })

  const methods = useForm<SignUpForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      role: 'USER',
      confirmPassword: '',
    },
  })

  const { setError } = methods

  const onSubmit = async (data: SignUpForm) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword: _, ...formData } = data
      await mutateAsync(formData)

      setSnackbar({
        open: true,
        message: 'Account created successfully!',
        severity: 'success',
      })
      setTimeout(() => navigate('/'), 1000)
    } catch {
      setSnackbar({
        open: true,
        message: 'Registration failed. Try again.',
        severity: 'error',
      })
      setError('email', { message: 'Email already in use' })
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
        Sign up
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
          <RHFText name="name" label="Name" placeholder="John Doe" />
          <RHFText
            name="password"
            label="Password"
            type="password"
            placeholder="••••••"
          />
          <RHFText
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="••••••"
          />

          <Button type="submit" fullWidth variant="contained">
            Sign up
          </Button>

          <Typography sx={{ textAlign: 'center' }}>
            Already have an account?{' '}
            <Link component={RouterLink} to="/auth/signin" variant="body2">
              Sign in
            </Link>
          </Typography>
        </Box>
      </FormProvider>
    </Card>
  )
}
