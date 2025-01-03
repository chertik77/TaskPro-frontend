import { useHotkeys } from 'react-hotkeys-hook'
import { Outlet } from 'react-router-dom'

import { Sidebar } from 'features/sidebar/components'
import {
  selectIsSidebarOpen,
  setIsSidebarOpen
} from 'features/sidebar/sidebar.slice'

import { Header } from 'components/header'
import { useTabletAndBelowMediaQuery } from 'hooks'
import { useAppDispatch, useAppSelector } from 'hooks/redux'

import { cn } from 'lib'

export const DashboardPage = () => {
  const isSidebarOpen = useAppSelector(selectIsSidebarOpen)

  const dispatch = useAppDispatch()

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
