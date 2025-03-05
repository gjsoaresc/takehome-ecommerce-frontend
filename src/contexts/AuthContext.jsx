import PropTypes from 'prop-types'
import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { apiClient } from '../lib/apiClient'

const AuthContext = createContext(undefined)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const fetchUser = async (authToken) => {
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

  const login = (newToken) => {
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

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
