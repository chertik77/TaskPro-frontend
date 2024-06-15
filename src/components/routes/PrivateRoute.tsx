import type { ReactElement } from 'react'

import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { selectIsLoggedIn } from 'redux/user.slice'

import { Pages } from 'config'

export const PrivateRoute = ({ component }: { component: ReactElement }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  return !isLoggedIn ? <Navigate to={Pages.Home} /> : component
}
