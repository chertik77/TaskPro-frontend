import { useTheme } from 'next-themes'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

export const Layout = () => {
  const { theme } = useTheme()

  return (
    <>
      <Outlet />
      <Toaster richColors theme={theme === 'dark' ? 'dark' : 'light'} />
    </>
  )
}
