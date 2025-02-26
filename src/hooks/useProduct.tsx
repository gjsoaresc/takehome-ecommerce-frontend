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
  categories?: string[]
  brands?: string[]
  colors?: string[]
  shoeSizes?: string[]
  priceRange?: number[]
}

type FiltersResponse = {
  categories: string[]
  brands: string[]
  colors?: string[]
  sizes?: string[]
  maxPrice: number
}

type PaginationResponse = {
  totalPages: number
  totalElements: number
  pageNumber: number
  pageSize: number
  first: boolean
  last: boolean
}

type PaginatedResponse = {
  content: Product[]
  pagination: PaginationResponse
  filters: FiltersResponse
}

export const useProducts = (
  filters?: Filters,
  page: number = 0,
  size: number = 10,
) => {
  return useQuery<PaginatedResponse>({
    queryKey: ['products', filters, page, size],
    queryFn: async () => {
      const params = new URLSearchParams()

      if (filters?.search) params.append('search', filters.search)
      if (filters?.categories?.length)
        filters.categories.forEach((cat) => params.append('categories[]', cat))
      if (filters?.brands?.length)
        filters.brands.forEach((brand) => params.append('brands[]', brand))
      if (filters?.colors?.length)
        filters.colors.forEach((color) => params.append('colors[]', color))
      if (filters?.shoeSizes?.length)
        filters.shoeSizes.forEach((size) => params.append('shoeSizes[]', size))
      if (filters?.priceRange?.[0] !== undefined)
        params.append('minPrice', filters.priceRange[0].toString())
      if (filters?.priceRange?.[1] !== undefined)
        params.append('maxPrice', filters.priceRange[1].toString())

      params.append('page', page.toString())
      params.append('size', size.toString())

      const response = await apiClient.get(
        `/products/filter?${params.toString()}`,
      )
      return response.data
    },
  })
}
