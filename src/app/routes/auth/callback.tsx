import { CallbackErrorPage } from '@/pages/callback'
import { createFileRoute, redirect } from '@tanstack/react-router'

import { userQueries } from '@/entities/user'

export const Route = createFileRoute('/auth/callback')({
  loader: async ({ context: { queryClient }, location }) => {
    const params = new URLSearchParams(location.search)

    if (!params.get('error') || params.get('error') === 'access_denied') {
      throw redirect({ to: '/' })
    }

    const isAuthenticated = await queryClient.ensureQueryData(userQueries.me())

    if (isAuthenticated) throw redirect({ to: '/dashboard' })
  },
  component: CallbackErrorPage
})
