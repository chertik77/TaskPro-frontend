import type { ReactElement } from 'react'

import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import {
  selectIsLoggedIn,
  selectIsRefreshing
} from 'redux/slices/user/user-slice'

export const PrivateRoute = ({ component }: { component: ReactElement }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const isRefreshing = useSelector(selectIsRefreshing)

  const shouldRedirect = !isLoggedIn && !isRefreshing

  return shouldRedirect ? <Navigate to='/' /> : component
}
