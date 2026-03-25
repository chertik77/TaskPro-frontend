import { Outlet } from '@tanstack/react-router'

import { useMetaThemeColor } from '@/features/user/change-theme'

import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar'

import { cn } from '@/shared/lib'
import { useSidebarStore } from '@/shared/store'

export const DashboardPage = () => {
  const { isOpen } = useSidebarStore()

  useMetaThemeColor()

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
