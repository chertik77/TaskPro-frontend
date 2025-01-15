import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useHotkeys } from 'react-hotkeys-hook'

import { useAuthStore } from 'features/auth/auth.store'
import { Sidebar } from 'features/sidebar/components'
import { useSidebarStore } from 'features/sidebar/sidebar.store'

import { Header } from 'components/header'
import { useTabletAndBelowMediaQuery } from 'hooks'

import { cn } from 'lib'

const DashboardRoute = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarStore()

  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  useHotkeys('mod+o', () => setIsSidebarOpen(!isSidebarOpen), {
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

export const Route = createFileRoute('/(dashboard)/dashboard')({
  beforeLoad: () => {
    if (!useAuthStore.getState().isLoggedIn) throw redirect({ to: '/' })
  },
  component: DashboardRoute
})
