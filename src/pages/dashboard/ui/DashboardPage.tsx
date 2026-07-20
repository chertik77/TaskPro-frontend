import { Outlet } from '@tanstack/react-router'
import { motion } from 'motion/react'

import { SettingsSync } from '@/entities/setting'
import { useMetaThemeColor } from '@/entities/user'

import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar'

import { useMediaQuery } from '@/shared/lib'
import { useSidebarStore } from '@/shared/store'

import { LabelModalProvider } from './LabelModalProvider'

export const DashboardPage = () => {
  const { isOpen } = useSidebarStore()

  useMetaThemeColor()

  const isTabletAndBelow = useMediaQuery('(max-width: 1439px)')

  const columns = isTabletAndBelow
    ? 'minmax(0, 1fr)'
    : isOpen
      ? '260px minmax(0, 1fr)'
      : '0px minmax(0, 1fr)'

  return (
    <>
      <SettingsSync />
      <LabelModalProvider />
      <div className='fixed top-0 right-0 block h-12 w-screen'>
        <motion.div
          className='grid h-screen grid-rows-[60px_minmax(0,1fr)]'
          animate={{ gridTemplateColumns: columns }}>
          <Sidebar />
          <Header />
          <Outlet />
        </motion.div>
      </div>
    </>
  )
}
