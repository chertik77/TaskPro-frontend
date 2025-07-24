import { QueryClientProvider } from './QueryClientProvider'
import { RouterProvider } from './RouteProvider'
import { ToastProvider } from './ToastProvider'

export const Providers = () => (
  <QueryClientProvider>
    <RouterProvider />
    <ToastProvider />
  </QueryClientProvider>
)
