import express from 'express'
import cors from 'cors'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const products = JSON.parse(readFileSync(join(__dirname, 'products.json'), 'utf-8'))

const app = express()
const PORT = 8080

app.use(cors())
app.use(express.json())

const getUniqueValues = (field) => {
  return [...new Set(products.map(product => product[field]))].sort()
}

const getAvailableFilters = () => {
  return {
    categories: getUniqueValues('category'),
    brands: getUniqueValues('brand'),
    colors: getUniqueValues('color'),
    sizes: [...new Set(products.flatMap(product => product.sizes))].sort(),
    maxPrice: Math.max(...products.map(product => product.price))
  }
}

const users = [
  {
    email: 'admin@example.com',
    password: 'admin123',
    role: 'ADMIN',
  },
]
const tokens = new Map()

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body
  const user = users.find(u => u.email === email && u.password === password)
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = 'mock-jwt-token-' + Math.random().toString(36).slice(2)
  tokens.set(token, user)

  res.json({ token })
})

app.post('/api/auth/register', (req, res) => {
  const { email, password } = req.body
  
  if (users.some(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' })
  }

  const newUser = { email, password }
  users.push(newUser)

  const token = 'mock-jwt-token-' + Math.random().toString(36).slice(2)
  tokens.set(token, newUser)

  res.status(201).json({ token })
})

app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const token = authHeader.split(' ')[1]
  const user = tokens.get(token)

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  res.json(user)
})

app.get('/api/products/filter', (req, res) => {
  const {
    page = '0',
    size = '10',
    search,
    categories,
    brands,
    colors,
    shoeSizes,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder,
  } = req.query

  let filteredProducts = [...products]

  if (search) {
    const searchLower = search.toLowerCase()
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower)
    )
  }

  if (categories) {
    const categoryList = categories.split(',')
    filteredProducts = filteredProducts.filter(product =>
      categoryList.includes(product.category)
    )
  }

  if (brands) {
    const brandList = brands.split(',')
    filteredProducts = filteredProducts.filter(product =>
      brandList.includes(product.brand)
    )
  }

  if (colors) {
    const colorList = colors.split(',')
    filteredProducts = filteredProducts.filter(product =>
      colorList.includes(product.color)
    )
  }

  if (shoeSizes) {
    const sizeList = shoeSizes.split(',')
    filteredProducts = filteredProducts.filter(product =>
      product.sizes.some(size => sizeList.includes(size))
    )
  }

  if (minPrice !== undefined) {
    filteredProducts = filteredProducts.filter(product =>
      product.price >= parseFloat(minPrice)
    )
  }

  if (maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(product =>
      product.price <= parseFloat(maxPrice)
    )
  }

  if (sortBy && sortOrder) {
    filteredProducts.sort((a, b) => {
      const order = sortOrder === 'asc' ? 1 : -1
      if (sortBy === 'price') {
        return (a.price - b.price) * order
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name) * order
      }
      return 0
    })
  }

  const pageNum = parseInt(page)
  const sizeNum = parseInt(size)
  const start = pageNum * sizeNum
  const paginatedProducts = filteredProducts.slice(start, start + sizeNum)

  res.json({
    filters: getAvailableFilters(),
    content: paginatedProducts,
    pagination: {
      totalPages: Math.ceil(filteredProducts.length / sizeNum),
      totalElements: filteredProducts.length,
      pageNumber: pageNum,
      pageSize: sizeNum,
      first: pageNum === 0,
      last: (pageNum + 1) * sizeNum >= filteredProducts.length
    }
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Mock server running at http://localhost:${PORT}`)
}) 