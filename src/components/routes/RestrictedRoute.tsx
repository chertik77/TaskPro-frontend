import { useAuth } from 'hooks'
import { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'

export const RestrictedRoute = ({ component }: { component: ReactElement }) => {
  const { isLoggedIn } = useAuth()

  return isLoggedIn ? <Navigate to='/dashboard' /> : component
}
