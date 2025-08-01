import { useEffect } from 'react'
import { Outlet } from '@tanstack/react-router'

import { useMetaThemeColor } from '@/features/user/change-theme'
import { useSidebarToggleShortcut } from '@/features/user/toggle-sidebar'

import { sessionActions } from '@/entities/session'

import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar'

import { cn } from '@/shared/lib'
import { useSidebarStore } from '@/shared/store'

export const DashboardPage = () => {
  const { isOpen } = useSidebarStore()

  useSidebarToggleShortcut()

  useMetaThemeColor()

  useEffect(() => {
    sessionActions.getCurrentUser()
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
