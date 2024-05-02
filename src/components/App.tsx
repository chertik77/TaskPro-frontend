import { useEffect } from 'react'
import { DashboardPage, HomePage, SigninPage, SignupPage } from 'pages'
import { useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { userApi } from 'redux/api/user'
import { selectIsLoggedIn } from 'redux/slices/user/user-slice'
import { persistor } from 'redux/store'

import { Layout } from 'components/Layout'
import { PrivateRoute, RestrictedRoute } from 'components/routes'

import { useAppDispatch } from 'hooks'

import { Board } from './dashboard'
import { CreateBoard } from './ui'

export const App = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) return
    dispatch(userApi.endpoints.current.initiate(undefined))
      .unwrap()
      .catch(e => {
        if (e.status === 401) {
          persistor.purge()
          navigate('/')
        }
      })
  }, [dispatch, isLoggedIn, navigate])

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
