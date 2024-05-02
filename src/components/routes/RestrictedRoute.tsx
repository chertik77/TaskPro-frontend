import type { ReactElement } from 'react'

import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectIsLoggedIn } from 'redux/slices/user/user-slice'

export const RestrictedRoute = ({ component }: { component: ReactElement }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  return isLoggedIn ? <Navigate to='/dashboard' /> : component
}
