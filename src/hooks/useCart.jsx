import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { apiClient } from '../lib/apiClient'

export const useCart = (userId) => {
  return useQuery({
    queryKey: ['cart', userId],
    queryFn: async () => {
      const response = await apiClient.get(`/cart/${userId}`)
      return response.data.items
    },
    enabled: !!userId,
  })
}

export const useAddToCart = (userId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ productId, quantity }) => {
      await apiClient.post(`/cart/${userId}/add/${productId}`, null, {
        params: { quantity },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', userId] })
    },
  })
}

export const useRemoveFromCart = (userId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (itemId) => {
      await apiClient.delete(`/cart/${userId}/remove/${itemId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', userId] })
    },
  })
}

export const useCartTotal = (userId) => {
  return useQuery({
    queryKey: ['cartTotal', userId],
    queryFn: async () => {
      const response = await apiClient.get(`/cart/${userId}/total`)
      return response.data.total
    },
    enabled: !!userId,
  })
}

export const useCheckout = (userId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      await apiClient.post(`/cart/${userId}/checkout`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', userId] })
    },
  })
}
