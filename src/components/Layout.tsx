import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

export const Layout = () => (
  <>
    <Suspense fallback={null}>
      <Outlet />
    </Suspense>
    <Toaster richColors position='top-right' />
  </>
)
