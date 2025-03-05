import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/signin" replace />
}

PrivateRoute.displayName = 'PrivateRoute'

export default PrivateRoute
