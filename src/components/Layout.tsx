import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

export const Layout = () => (
  <>
    <Outlet />
    <Toaster richColors position='top-right' />
  </>
)
