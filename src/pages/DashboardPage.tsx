import { useHotkeys } from 'react-hotkeys-hook'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

import { Header, Sidebar } from 'components/dashboard'

import { useTabletAndBelowMediaQuery } from 'hooks'

import { selectIsSidebarOpen, setIsSidebarOpen } from 'redux/sidebar.slice'

import { cn } from 'lib'

export const DashboardPage = () => {
  const isSidebarOpen = useSelector(selectIsSidebarOpen)

  const dispatch = useDispatch()

  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  useHotkeys('mod+o', () => dispatch(setIsSidebarOpen(!isSidebarOpen)), {
    preventDefault: true,
    ignoreEventWhen: () => isTabletAndBelow
  })

  return (
    <div
      className={cn(
        'grid h-dvh grid-rows-[60px,1fr]',
        isSidebarOpen && 'desktop:grid-cols-[260px,1fr]'
      )}>
      <Sidebar />
      <Header />
      <Outlet />
    </div>
  )
}
