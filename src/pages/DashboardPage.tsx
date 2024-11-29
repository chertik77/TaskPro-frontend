import { useSidebar } from 'contexts/sidebar.context'
import { Outlet } from 'react-router-dom'

import { Header, Sidebar } from 'components/dashboard'

import { cn } from 'lib'

export const DashboardPage = () => {
  const { isSidebarOpen } = useSidebar()

  return (
    <div
      className={cn(
        'grid h-dvh grid-rows-[60px,1fr] transition-all duration-300',
        isSidebarOpen
          ? 'desktop:grid-cols-[260px,1fr]'
          : 'desktop:grid-cols-[80px,1fr]'
      )}>
      <Sidebar />

      <Header />
      <Outlet />
    </div>
  )
}
