import { useQueryClient } from '@tanstack/react-query'
import { RouterProvider as TanStackRouterProvider } from '@tanstack/react-router'

import { sessionService } from '@/entities/session'
import { userQueries } from '@/entities/user'

import { attachInternalApiMemoryStorage } from '@/shared/api'
import { router } from '@/shared/lib'
import { GlobalError, Loader } from '@/shared/ui'

export const RouterProvider = () => {
  const queryClient = useQueryClient()

  attachInternalApiMemoryStorage({
    refreshTokens: sessionService.refreshTokens,
    logout: () => queryClient.resetQueries({ queryKey: userQueries.current() })
  })

  return (
    <TanStackRouterProvider
      router={router}
      defaultPendingComponent={() => (
        <div className='fixed top-0 right-0 block h-12 w-screen'>
          <div
            className='bg-soft-green flex h-screen items-center justify-center'>
            <Loader className='size-12' />
          </div>
        </div>
      )}
      defaultErrorComponent={() => <GlobalError />}
    />
  )
}
