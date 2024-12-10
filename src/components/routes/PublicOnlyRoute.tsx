import type { ReactElement } from 'react'

import { Navigate } from 'react-router-dom'

import { useAppSelector } from 'hooks/redux'

import { selectIsLoggedIn } from 'redux/user.slice'

import { Pages } from 'config'

export const PublicOnlyRoute = ({ component }: { component: ReactElement }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return isLoggedIn ? <Navigate to={Pages.Dashboard} /> : component
}
