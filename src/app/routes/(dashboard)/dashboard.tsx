import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { useSidebarToggleShortcut } from '@/features/user/toggle-sidebar'

import { Header } from '@/blocks/header'
import { Sidebar } from '@/blocks/sidebar'

import { cn } from '@/shared/lib/cn'
import { useAuthStore, useSidebarStore } from '@/shared/store'

const DashboardRoute = () => {
  const isSidebarOpen = useSidebarStore(state => state.isSidebarOpen)

  useSidebarToggleShortcut()

  useAuthStore(state => state.getCurrentUser)()

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
