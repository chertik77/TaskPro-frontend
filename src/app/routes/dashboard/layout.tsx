import { DashboardPage } from '@/pages/dashboard'
import { createFileRoute, redirect } from '@tanstack/react-router'

import { sessionQueries } from '@/entities/user'

import { Loader } from '@/shared/ui'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async ({ context: { queryClient } }) => {
    const isAuthenticated = await queryClient.query({
      ...sessionQueries.current(),
      staleTime: 'static'
    })

    if (!isAuthenticated) throw redirect({ to: '/' })
  },
  pendingComponent: () => (
    <div
      className='bg-white-muted dark:bg-black-muted fixed inset-0 flex min-h-dvh
        items-center justify-center'>
      <Loader className='size-12 stroke-black dark:stroke-white' />
    </div>
  ),
  component: DashboardPage
})
