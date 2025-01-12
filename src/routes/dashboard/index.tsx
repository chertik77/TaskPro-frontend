import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useAtomValue } from 'jotai/react'

import { authService } from 'features/auth/auth.service'
import { Sidebar } from 'features/sidebar/components'
import { sidebarAtom } from 'features/sidebar/sidebar.atom'

import { Header } from 'components/header'

import { cn } from 'lib'

const DashboardRoute = () => {
  const isSidebarOpen = useAtomValue(sidebarAtom)

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

export const Route = createFileRoute('/dashboard/')({
  beforeLoad: () => {
    const isSignedIn = authService.isSignedIn()
    if (!isSignedIn) throw redirect({ to: '/' })
  },
  component: DashboardRoute
})
