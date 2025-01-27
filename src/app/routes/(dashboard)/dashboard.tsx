import { Header } from '@/blocks/header'
import { Sidebar } from '@/blocks/sidebar'
import { useTabletAndBelowMediaQuery } from '@/shared/hooks'
import { cn } from '@/shared/lib'
import { useAuthStore, useSidebarStore } from '@/shared/store'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useHotkeys } from 'react-hotkeys-hook'

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
