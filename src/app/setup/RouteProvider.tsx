import { RouterProvider as TanStackRouterProvider } from '@tanstack/react-router'

import { isStoredAppearanceActive } from '@/shared/config'
import { router } from '@/shared/lib'
import { GlobalError, PageLoader } from '@/shared/ui'

export const RouterProvider = () => (
  <TanStackRouterProvider
    router={router}
    defaultPendingComponent={() => (
      <PageLoader variant={isStoredAppearanceActive() ? 'themed' : 'brand'} />
    )}
    defaultErrorComponent={() => <GlobalError />}
  />
)
