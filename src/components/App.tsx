import { useGetCurrentUser } from 'features/user/hooks'
import { AuthPage, DashboardPage, HomePage } from 'pages'
import { Route, Routes } from 'react-router-dom'

import { PrivateRoute, PublicOnlyRoute } from 'components/routes'

import { Pages } from 'config'

import { Board } from './dashboard'
import { EmptyBoard } from './dashboard/board/EmptyBoard'
import { Layout } from './Layout'

export const App = () => {
  useGetCurrentUser()

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
          element={<PublicOnlyRoute component={<AuthPage />} />}
        />
        <Route
          path={Pages.Signup}
          element={<PublicOnlyRoute component={<AuthPage />} />}
        />
        <Route
          path={Pages.Dashboard}
          element={<PrivateRoute component={<DashboardPage />} />}>
          <Route
            index
            element={<EmptyBoard />}
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
