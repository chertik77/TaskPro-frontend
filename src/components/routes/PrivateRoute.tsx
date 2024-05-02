import type { ReactElement } from 'react'

import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectIsAuth } from 'redux/slices/user/user-slice'

export const PrivateRoute = ({ component }: { component: ReactElement }) => {
  const isAuth = useSelector(selectIsAuth)

  return !isAuth ? <Navigate to='/' /> : component
}
