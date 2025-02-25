import { RouteObject } from 'react-router-dom'

import { SignIn } from './pages/Auth/SignIn'
import { Home } from './pages/Home'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
]
