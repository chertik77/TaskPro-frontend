import { useTheme } from 'next-themes'
import { useMediaQuery } from 'react-responsive'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

export const Layout = () => {
  const { theme } = useTheme()

  const isLaptopOrMobile = useMediaQuery({ maxWidth: 1440 })

  return (
    <>
      <Outlet />
      <Toaster
        position={isLaptopOrMobile ? 'top-center' : 'bottom-right'}
        richColors
        theme={theme === 'dark' ? 'dark' : 'light'}
        className='text-balance'
      />
    </>
  )
}
