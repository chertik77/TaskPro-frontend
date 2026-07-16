import { MotionProvider } from './MotionProvider'
import { QueryClientProvider } from './QueryClientProvider'
import { RouterProvider } from './RouteProvider'
import { ToastProvider } from './ToastProvider'

export const Providers = () => (
  <QueryClientProvider>
    <MotionProvider>
      <RouterProvider />
      <ToastProvider />
    </MotionProvider>
  </QueryClientProvider>
)
