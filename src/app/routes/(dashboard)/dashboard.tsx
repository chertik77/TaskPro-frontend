import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { useSidebarToggleShortcut } from '@/features/toggle-sidebar/hooks'

import { Header } from '@/blocks/header'
import { Sidebar } from '@/blocks/sidebar'

import { cn } from '@/shared/lib'
import { useAuthStore, useSidebarStore } from '@/shared/store'

const DashboardRoute = () => {
  const isSidebarOpen = useSidebarStore(state => state.isSidebarOpen)

  useSidebarToggleShortcut()

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
    if (!useAuthStore.getState().signedIn()) throw redirect({ to: '/' })
  },
  component: DashboardRoute
})
