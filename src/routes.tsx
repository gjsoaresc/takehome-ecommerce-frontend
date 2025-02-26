import { RouteObject } from 'react-router-dom'

import { PrivateRoute } from './components/PrivateRoute'
import { Auth } from './pages/Auth'
import { SignUp } from './pages/Auth/SignUp'
import { SignIn } from './pages/Auth/SingIn'
import { Cart } from './pages/Cart'
import { Home } from './pages/Home'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'auth',
    element: <Auth />,
    children: [
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'signin',
        element: <SignIn />,
      },
    ],
  },
  {
    path: 'cart',
    element: <PrivateRoute />,
    children: [
      {
        path: '',
        element: <Cart />,
      },
    ],
  },
]
