import { DashboardPage, HomePage, SigninPage, SignupPage } from 'pages'
import { Route, Routes } from 'react-router-dom'

import { PrivateRoute, RestrictedRoute } from 'components/routes'

import { Board } from './dashboard'
import { Layout } from './Layout'
import { CreateBoard } from './ui'

export const App = () => (
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
