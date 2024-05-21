import type { AxiosError } from 'axios'

import { useEffect } from 'react'
import { DashboardPage, HomePage, SigninPage, SignupPage } from 'pages'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import { PrivateRoute, RestrictedRoute } from 'components/routes'

import { current, logout, selectIsLoggedIn } from 'redux/user.slice'

import { authService } from 'services'

import { Board } from './dashboard'
import { Layout } from './Layout'
import { CreateBoard } from './ui'

export const App = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!isLoggedIn) return
    authService
      .current()
      .then(r => dispatch(current(r)))
      .catch((e: AxiosError) => {
        if (e.response?.status === 401) {
          dispatch(logout())
        }
      })
  }, [dispatch, isLoggedIn])

  return (
    <Routes>
      <Route
        path='/'
        element={<Layout />}>
        <Route
          index
          element={<RestrictedRoute component={<HomePage />} />}
        />
        <Route
          path='/auth/signin'
          element={<RestrictedRoute component={<SigninPage />} />}
        />
        <Route
          path='/auth/signup'
          element={<RestrictedRoute component={<SignupPage />} />}
        />
        <Route
          path='/dashboard'
          element={<PrivateRoute component={<DashboardPage />} />}>
          <Route
            index
            element={<CreateBoard />}
          />
          <Route
            path=':boardId'
            element={<Board />}
          />
        </Route>
      </Route>
    </Routes>
  )
}
