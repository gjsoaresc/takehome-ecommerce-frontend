import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../lib/apiClient'

export const useProducts = (filters, page = 0, size = 10) => {
  return useQuery({
    queryKey: ['products', filters, page, size],
    queryFn: async () => {
      const params = new URLSearchParams()

      const filterMappings = {
        search: { key: 'search', isArray: false },
        categories: { key: 'categories', isArray: true },
        brands: { key: 'brands', isArray: true },
        colors: { key: 'colors', isArray: true },
        shoeSizes: { key: 'shoeSizes', isArray: true },
      }

      Object.entries(filterMappings).forEach(([filterKey, { key, isArray }]) => {
        const value = filters?.[filterKey]
        if (!value) return
        
        if (isArray && value.length) {
          params.append(key, value.join(','))
        } else if (!isArray) {
          params.append(key, value)
        }
      })

      if (filters?.priceRange) {
        const [minPrice, maxPrice] = filters.priceRange
        if (minPrice !== undefined) params.append('minPrice', minPrice.toString())
        if (maxPrice !== undefined) params.append('maxPrice', maxPrice.toString())
      }

      if (filters?.sort) {
        const [sortBy, sortOrder] = filters.sort.split('-')
        params.append('sortBy', sortBy)
        params.append('sortOrder', sortOrder)
      }

      params.append('page', page.toString())
      params.append('size', size.toString())

      const response = await apiClient.get(
        `/products/filter?${params.toString()}`,
      )
      return response.data
    },
  })
}