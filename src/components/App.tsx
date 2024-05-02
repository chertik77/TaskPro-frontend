import { DashboardPage, HomePage, SigninPage, SignupPage } from 'pages'
import { Route, Routes } from 'react-router-dom'

import { Layout } from 'components/Layout'
import { PrivateRoute, RestrictedRoute } from 'components/routes'

import { Board } from './pages/dashboard'
import { CreateBoard } from './ui'

export const App = () => {
  // const dispatch = useAppDispatch()
  // const isLoggedIn = useSelector(selectIsLoggedIn)

  // useEffect(() => {
  //   if (!isLoggedIn) return
  //   dispatch(userApi.endpoints.current.initiate(undefined))
  //     .unwrap()
  //     .catch(e => {
  //       if (e.status === 401) {
  //         persistor.purge()
  //       }
  //     })
  // }, [dispatch, isLoggedIn])

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
