import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { apiClient } from '~/lib/apiClient'

type User = {
  id: number
  name: string
  email: string
  role: string
}

type AuthContextType = {
  token: string | null
  isAuthenticated: boolean
  user: User | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token'),
  )
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  const fetchUser = async (authToken: string) => {
    try {
      const response = await apiClient.get('/auth/me', {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      setUser(response.data)
      localStorage.setItem('user', JSON.stringify(response.data))
    } catch {
      logout()
    }
  }

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
    fetchUser(newToken)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
    navigate('/auth/signin')
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
      fetchUser(storedToken)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated: !!token, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
