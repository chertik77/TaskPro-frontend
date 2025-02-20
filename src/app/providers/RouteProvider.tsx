import { RouterProvider as TanStackRouterProvider } from '@tanstack/react-router'

import { router } from '@/shared/lib/react-router'

export const RouterProvider = () => <TanStackRouterProvider router={router} />
