import { createFileRoute, redirect } from '@tanstack/react-router'
import { store } from 'store'

import { DashboardPage } from 'pages'

export const Route = createFileRoute('/dashboard/')({
  beforeLoad: () => {
    const isLoggedIn = store.getState().user.isLoggedIn

    if (!isLoggedIn) {
      throw redirect({ to: '/' })
    }
  },
  component: DashboardPage
})
