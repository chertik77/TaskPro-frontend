import { useEffect } from 'react'
import { SidebarProvider } from 'contexts/sidebar.context'
import { DashboardPage, HomePage, SigninPage, SignupPage } from 'pages'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import { PrivateRoute, PublicOnlyRoute } from 'components/routes'

import { updateUser } from 'redux/user.slice'

import { Pages } from 'config'
import { userService } from 'services'

import { Board } from './dashboard'
import { Layout } from './Layout'
import { CreateBoard } from './ui'

export const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    userService.getCurrentUser().then(r => dispatch(updateUser(r)))
  }, [dispatch])

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
