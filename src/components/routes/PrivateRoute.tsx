import { useAuth } from 'hooks'
import { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({ component }: { component: ReactElement }) => {
  const { isRefreshing, isLoggedIn } = useAuth()

  const shouldRedirect = !isLoggedIn && !isRefreshing

  return shouldRedirect ? <Navigate to='/' /> : component
}
