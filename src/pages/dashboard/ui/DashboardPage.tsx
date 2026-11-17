import { Outlet } from '@tanstack/react-router'

import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar'

import { SettingsSync } from '@/entities/setting'

import { useMediaQuery } from '@/shared/lib'
import { useSidebarStore } from '@/shared/model'

import { LabelModalProvider } from './LabelModalProvider'

export const DashboardPage = () => {
  const { isOpen } = useSidebarStore()

  const isTabletAndBelow = useMediaQuery('(max-width: 1439px)')

  const columns = isTabletAndBelow
    ? 'minmax(0, 1fr)'
    : isOpen
      ? '260px minmax(0, 1fr)'
      : '0px minmax(0, 1fr)'

  return (
    <SettingsSync>
      <LabelModalProvider />
      <div className='fixed top-0 right-0 block h-12 w-screen'>
        <div
          className='grid h-dvh grid-rows-[60px_minmax(0,1fr)]'
          style={{ gridTemplateColumns: columns }}>
          <Sidebar />
          <Header />
          <Outlet />
        </div>
      </div>
    </SettingsSync>
  )
}
