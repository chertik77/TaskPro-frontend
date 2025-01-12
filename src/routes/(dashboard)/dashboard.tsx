import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useAtom } from 'jotai/react'
import { useHotkeys } from 'react-hotkeys-hook'

import { authService } from 'features/auth/auth.service'
import { boardsQueryOptions } from 'features/kanban/board/boardsQueryOptions'
import { Sidebar } from 'features/sidebar/components'
import { sidebarAtom } from 'features/sidebar/sidebar.atom'

import { Header } from 'components/header'
import { useTabletAndBelowMediaQuery } from 'hooks'

import { cn } from 'lib'

const DashboardRoute = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useAtom(sidebarAtom)

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
    const isSignedIn = authService.isSignedIn()
    if (!isSignedIn) throw redirect({ to: '/' })
  },
  component: DashboardRoute,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(boardsQueryOptions)
})
