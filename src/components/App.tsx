import { Layout } from 'components/Layout'
import { PrivateRoute, RestrictedRoute } from 'components/routes'
import { useAppDispatch } from 'hooks'
import { DashboardPage, HomePage, SigninPage, SignupPage } from 'pages'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { userApi } from 'redux/api/user'
import { selectIsAuth } from 'redux/slices/user/user-slice'
import { persistor } from 'redux/store'
import { Board } from './pages/DashboardPage'
import { CreateBoard } from './ui'

export const App = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isAuth = useSelector(selectIsAuth)

  useEffect(() => {
    if (!isAuth) return
    dispatch(userApi.endpoints.current.initiate(undefined))
      .unwrap()
      .catch(e => {
        if (e.status === 401) {
          persistor.purge()
          navigate('/auth/signin', { replace: true })
        }
      })
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<RestrictedRoute component={<HomePage />} />} />
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
          <Route index element={<CreateBoard />} />
          <Route path=':name' element={<Board />} />
        </Route>
      </Route>
    </Routes>
  )
}
