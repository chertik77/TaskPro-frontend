import { createFileRoute, redirect } from '@tanstack/react-router'

import { Welcome } from '@/blocks/welcome'

import { getAuthStore } from '@/shared/store'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    if (getAuthStore().isAuthenticated) throw redirect({ to: '/dashboard' })
  },
  component: Welcome
})
