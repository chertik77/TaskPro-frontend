import { routeTree } from '@/routeTree.gen'
import {
  createRouter,
  RouterProvider as TanStackRouterProvider
} from '@tanstack/react-router'
import { ModalProvider } from 'react-modal-state'

declare module '@tanstack/react-router' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    router: typeof router
  }
}

const router = createRouter({ routeTree, defaultPendingMinMs: 0 })

export const RouterProvider = () => (
  <TanStackRouterProvider
    router={router}
    Wrap={({ children }) => <ModalProvider>{children}</ModalProvider>}
  />
)
