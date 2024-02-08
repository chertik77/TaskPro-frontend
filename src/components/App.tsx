import { Layout } from 'components/Layout'
import { PrivateRoute } from 'components/routes/PrivateRoute'
import { RestrictedRoute } from 'components/routes/RestrictedRoute'
import { useAppDispatch, useAuth } from 'hooks'
import { useTheme } from 'next-themes'
import { DashboardPage, HomePage, SigninPage, SignupPage } from 'pages'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, redirect } from 'react-router-dom'
import { userApi } from 'redux/api/user'
import { selectTheme } from 'redux/slices/user/user-slice'
import { Loader } from './ui/loader/Loader'

export const App = () => {
  const theme = useSelector(selectTheme)
  const dispatch = useAppDispatch()
  const { setTheme } = useTheme()
  const { isRefreshing, token } = useAuth()

  useEffect(() => {
    if (token === null) return
    dispatch(userApi.endpoints.current.initiate(undefined))
      .unwrap()
      .catch(e => {
        if (e.status === 401) redirect('/auth/signin')
      })
  }, [])

  useEffect(() => {
    setTheme(theme)
  }, [theme])

  return isRefreshing ? (
    <div className='flex h-dvh items-center justify-center'>
      <Loader />
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
