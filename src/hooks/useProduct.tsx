import { useQuery } from '@tanstack/react-query'

import { apiClient } from '~/lib/apiClient'

type Product = {
  id: number
  name: string
  price: number
  description: string
  category: string
  brand: string
  color: string
  sizes: string[]
  imageUrl: string
}

export type Filters = {
  search?: string
  category?: string
  brand?: string
  priceRange?: number[]
  shoeSize?: number
}

type PaginatedResponse = {
  content: Product[]
  totalPages: number
  totalElements: number
  pageNumber: number
  pageSize: number
  first: boolean
  last: boolean
}

export const useProducts = (
  filters?: Filters,
  page: number = 0,
  size: number = 10,
) => {
  return useQuery<PaginatedResponse>({
    queryKey: ['products', filters, page, size],
    queryFn: async () => {
      const params: Record<string, string | number | undefined> = {
        search: filters?.search || undefined,
        category: filters?.category || undefined,
        brand: filters?.brand || undefined,
        minPrice:
          filters?.priceRange?.[0] !== undefined
            ? filters.priceRange[0]
            : undefined,
        maxPrice:
          filters?.priceRange?.[1] !== undefined
            ? filters.priceRange[1]
            : undefined,
        page,
        size,
      }

      Object.keys(params).forEach((key) => {
        if (params[key] === undefined || params[key] === '') {
          delete params[key]
        }
      })

      const response = await apiClient.get('/products/filter', { params })
      return response.data
    },
  })
}
