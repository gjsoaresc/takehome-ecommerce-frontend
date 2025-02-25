import { useMutation } from '@tanstack/react-query'

import { apiClient } from '~/lib/apiClient'

export interface AuthResponse {
  token: string
}

export interface AuthCredentials {
  username: string
  password: string
}

export const useLogin = () => {
  return useMutation<AuthResponse, Error, AuthCredentials>({
    mutationFn: async (credentials) => {
      const response = await apiClient.post('/auth/login', credentials)
      return response.data
    },
  })
}

export const useRegister = () => {
  return useMutation<AuthResponse, Error, AuthCredentials>({
    mutationFn: async (credentials) => {
      const response = await apiClient.post('/auth/register', credentials)
      return response.data
    },
  })
}
