import { WelcomePage } from '@/pages/welcome'
import { createFileRoute, redirect } from '@tanstack/react-router'

import { userQueries } from '@/entities/user'

export const Route = createFileRoute('/')({
  beforeLoad: ({ context: { queryClient } }) => {
    const isAuthenticated = queryClient.getQueryData(userQueries.current())

    if (isAuthenticated) throw redirect({ to: '/dashboard' })
  },
  component: WelcomePage
})
