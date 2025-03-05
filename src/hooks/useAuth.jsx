import { useMutation } from '@tanstack/react-query'

import { useAuth } from '../contexts/AuthContext'
import { apiClient } from '../lib/apiClient'

export const useLogin = () => {
  const { login } = useAuth()

  return useMutation({
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

  return useMutation({
    mutationFn: async (credentials) => {
      const response = await apiClient.post('/auth/register', credentials)
      return response.data
    },
    onSuccess: ({ token }) => {
      login(token)
    },
  })
}
