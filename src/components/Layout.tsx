import { useTheme } from 'contexts/theme.context'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

import { useTabletAndBelowMediaQuery } from 'hooks'

export const Layout = () => {
  const { theme } = useTheme()

  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  return (
    <>
      <Outlet />
      <Toaster
        position={isTabletAndBelow ? 'top-center' : 'bottom-right'}
        richColors
        theme={theme === 'dark' ? 'dark' : 'light'}
        className='text-balance'
      />
    </>
  )
}
