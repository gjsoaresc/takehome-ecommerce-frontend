import { useMutation } from '@tanstack/react-query'

import { useAuth } from '~/contexts/AuthContext'
import { apiClient } from '~/lib/apiClient'

export type AuthResponse = {
  token: string
}

export type Credentials = {
  email: string
  password: string
}

export type RegisterCredentials = Credentials & {
  name: string
  role: 'USER' | 'ADMIN'
}

export const useLogin = () => {
  const { login } = useAuth()

  return useMutation<AuthResponse, Error, Credentials>({
    mutationFn: async (credentials) => {
      const response = await apiClient.post('/auth/login', credentials)
      return response.data
    },
    onSuccess: ({ token }) => {
      login(token)
    },
  })
}

export const useRegister = () => {
  const { login } = useAuth()

  return useMutation<AuthResponse, Error, RegisterCredentials>({
    mutationFn: async (credentials) => {
      const response = await apiClient.post('/auth/register', credentials)
      return response.data
    },
    onSuccess: ({ token }) => {
      login(token)
    },
  })
}
