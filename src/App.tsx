import { Outlet } from '@tanstack/react-router'
import { useAppDispatch } from 'hooks'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { userApi } from 'redux/api/user'
import { selectIsRefreshing } from 'redux/slices/user/user-slice'

export const App = () => {
  const dispatch = useAppDispatch()
  const isRefreshing = useSelector(selectIsRefreshing)

  useEffect(() => {
    dispatch(userApi.endpoints.current.initiate(undefined))
  }, [dispatch])

  return isRefreshing ? (
    <div className='flex items-center justify-center h-dvh'>
      {/* <Loader /> */}
    </div>
  ) : (
    <Outlet />
  )
}
