import { RouterProvider as TanStackRouterProvider } from '@tanstack/react-router'

import { router } from '@/shared/lib'
import { GlobalError, Loader } from '@/shared/ui'

export const RouterProvider = () => (
  <TanStackRouterProvider
    router={router}
    defaultPendingComponent={() => (
      <div className='bg-soft-green flex h-dvh items-center justify-center'>
        <Loader className='size-12' />
      </div>
    )}
    defaultErrorComponent={() => <GlobalError />}
  />
)
