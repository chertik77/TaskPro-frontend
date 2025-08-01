import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { userQueries } from '@/entities/user'

export const Route = createFileRoute('/auth')({
  beforeLoad: ({ context: { queryClient } }) => {
    const isAuthenticated = queryClient.getQueryData(userQueries.current())

    if (isAuthenticated) throw redirect({ to: '/dashboard' })
  },
  component: () => (
    <div className='bg-soft-green flex h-dvh items-center justify-center'>
      <Outlet />
    </div>
  )
})
