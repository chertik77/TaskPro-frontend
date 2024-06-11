import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { SidebarProvider } from 'contexts/sidebar.context'
import { DashboardPage, HomePage, SigninPage, SignupPage } from 'pages'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import { PrivateRoute, PublicOnlyRoute } from 'components/routes'

import { selectIsLoggedIn, updateUser } from 'redux/user.slice'

import { Pages } from 'config'
import { userService } from 'services'

import { Board } from './dashboard'
import { Layout } from './Layout'
import { CreateBoard } from './ui'

export const App = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const dispatch = useDispatch()

  const { data, isSuccess } = useQuery({
    queryKey: ['user'],
    queryFn: userService.getCurrentUser,
    enabled: isLoggedIn
  })

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateUser(data))
    }
  }, [data, dispatch, isSuccess])

  return (
    <Routes>
      <Route
        path={Pages.Home}
        element={<Layout />}>
        <Route
          index
          element={<PublicOnlyRoute component={<HomePage />} />}
        />
        <Route
          path={Pages.Signin}
          element={<PublicOnlyRoute component={<SigninPage />} />}
        />
        <Route
          path={Pages.Signup}
          element={<PublicOnlyRoute component={<SignupPage />} />}
        />
        <Route
          path={Pages.Dashboard}
          element={
            <PrivateRoute
              component={
                <SidebarProvider>
                  <DashboardPage />
                </SidebarProvider>
              }
            />
          }>
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
