import { useMutation } from '@tanstack/react-query'

import { apiClient } from '../lib/apiClient'

export const useSeed = () => {
  return useMutation({
    mutationFn: async () => {
      await apiClient.post('/seed')
    },
    onSuccess: () => {
      localStorage.setItem('seeded', 'true')
    },
  })
}
