import { GoogleProvider } from './GoogleProvider'
import { QueryClientProvider } from './QueryClientProvider'
import { RouterProvider } from './RouteProvider'
import { ToastProvider } from './ToastProvider'

export const Providers = () => (
  <GoogleProvider>
    <QueryClientProvider>
      <RouterProvider />
      <ToastProvider />
    </QueryClientProvider>
  </GoogleProvider>
)
