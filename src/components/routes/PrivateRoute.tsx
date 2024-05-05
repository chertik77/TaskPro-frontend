import type { ReactElement } from 'react'

import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { selectIsLoggedIn } from 'redux/user.slice'

export const PrivateRoute = ({ component }: { component: ReactElement }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const shouldRedirect = !isLoggedIn

  return shouldRedirect ? <Navigate to='/' /> : component
}
