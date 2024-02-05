import { Layout } from 'components/Layout'
import { PrivateRoute } from 'components/routes/PrivateRoute'
import { RestrictedRoute } from 'components/routes/RestrictedRoute'
import { useAppDispatch, useAuth } from 'hooks'
import { lazy, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { userApi } from 'redux/api/user'

const HomePage = lazy(() => import('pages/HomePage'))
const SigninPage = lazy(() => import('pages/SigninPage'))
const SignupPage = lazy(() => import('pages/SignupPage'))
const DashboardPage = lazy(() => import('pages/DashboardPage'))

export const App = () => {
  const dispatch = useAppDispatch()
  const { isRefreshing } = useAuth()

  useEffect(() => {
    dispatch(userApi.endpoints.current.initiate(undefined))
  }, [dispatch])

  return isRefreshing ? (
    <div className='flex items-center justify-center h-dvh'>
      {/* <Loader /> */}
    </div>
  ) : (
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
          element={<PrivateRoute component={<DashboardPage />} />}
        />
      </Route>
    </Routes>
  )
}
