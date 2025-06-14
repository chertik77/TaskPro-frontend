import { useEffect } from 'react'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { useSidebarToggleShortcut } from '@/features/user/toggle-sidebar'

import { Header } from '@/blocks/header'
import { Sidebar } from '@/blocks/sidebar'

import { cn } from '@/shared/lib'
import { authActions, getAuthStore, useSidebarStore } from '@/shared/store'

const DashboardRoute = () => {
  const { isOpen } = useSidebarStore()

  useSidebarToggleShortcut()

  useEffect(() => {
    authActions.getCurrentUser()
  }, [])

  return (
    <div
      className={cn(
        'grid h-dvh grid-rows-[60px_1fr]',
        isOpen && 'desktop:grid-cols-[260px_1fr]'
      )}>
      <Sidebar />
      <Header />
      <Outlet />
    </div>
  )
}

export const Route = createFileRoute('/(dashboard)/dashboard')({
  beforeLoad: () => {
    const { isAuthenticated } = getAuthStore()

    if (!isAuthenticated) throw redirect({ to: '/' })
  },
  component: DashboardRoute
})
