import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { userService } from 'features/user/model'
import { AuthPage, DashboardPage, HomePage } from 'pages'
import { Route, Routes } from 'react-router-dom'

import { PrivateRoute, PublicOnlyRoute } from 'components/routes'

import { useAppDispatch, useAppSelector } from 'hooks/redux'

import { selectIsLoggedIn, updateUser } from 'redux/user.slice'

import { Pages } from 'config'

import { Board } from './dashboard'
import { EmptyBoard } from './dashboard/board/EmptyBoard'
import { Layout } from './Layout'

export const App = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const dispatch = useAppDispatch()

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
