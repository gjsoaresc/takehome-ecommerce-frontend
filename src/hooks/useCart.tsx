import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { apiClient } from '~/lib/apiClient'

export interface CartItem {
  id: number
  product: {
    id: number
    name: string
    price: number
    imageUrl: string
  }
  quantity: number
}

export const useCart = (userId: number) => {
  return useQuery<CartItem[]>({
    queryKey: ['cart', userId],
    queryFn: async () => {
      const response = await apiClient.get(`/cart/${userId}`)
      return response.data.items
    },
    enabled: !!userId,
  })
}

export const useAddToCart = (userId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: number
      quantity: number
    }) => {
      await apiClient.post(`/cart/${userId}/add/${productId}`, null, {
        params: { quantity },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', userId] })
    },
  })
}

export const useRemoveFromCart = (userId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (itemId: number) => {
      await apiClient.delete(`/cart/${userId}/remove/${itemId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', userId] })
    },
  })
}

export const useCartTotal = (userId: number) => {
  return useQuery<number>({
    queryKey: ['cartTotal', userId],
    queryFn: async () => {
      const response = await apiClient.get(`/cart/${userId}/total`)
      return response.data.total
    },
    enabled: !!userId,
  })
}

export const useCheckout = (userId: number) => {
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
