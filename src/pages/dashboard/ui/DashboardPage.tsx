import { Outlet } from '@tanstack/react-router'
import { motion } from 'motion/react'

import { useMetaThemeColor } from '@/features/user/change-theme'

import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar'

import { useTabletAndBelowMediaQuery } from '@/shared/lib'
import { useSidebarStore } from '@/shared/store'

export const DashboardPage = () => {
  const { isOpen } = useSidebarStore()

  useMetaThemeColor()

  const isTabletAndBelow = useTabletAndBelowMediaQuery('(max-width: 1439px)')

  const columns = isTabletAndBelow ? '1fr' : isOpen ? '260px 1fr' : '0px 1fr'

  return (
    <div className='fixed top-0 right-0 block h-12 w-screen'>
      <motion.div
        className='grid h-screen grid-rows-[60px_1fr]'
        animate={{ gridTemplateColumns: columns }}>
        <Sidebar />
        <Header />
        <Outlet />
      </motion.div>
    </div>
  )
}
