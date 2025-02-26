import { useMutation } from '@tanstack/react-query'

import { apiClient } from '~/lib/apiClient'

export const useSeed = () => {
  return useMutation<void, Error>({
    mutationFn: async () => {
      await apiClient.post('/seed')
    },
    onSuccess: () => {
      localStorage.setItem('seeded', 'true')
    },
  })
}
