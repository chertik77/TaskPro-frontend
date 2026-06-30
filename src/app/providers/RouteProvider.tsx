import { RouterProvider as TanStackRouterProvider } from '@tanstack/react-router'

import { router } from '@/shared/lib'
import { GlobalError, Loader } from '@/shared/ui'

export const RouterProvider = () => (
  <TanStackRouterProvider
    router={router}
    defaultPendingComponent={() => (
      <div className='fixed top-0 right-0 block h-12 w-screen'>
        <div className='bg-soft-green flex h-screen items-center justify-center'>
          <Loader className='size-12' />
        </div>
      </div>
    )}
    defaultErrorComponent={() => <GlobalError />}
  />
)
