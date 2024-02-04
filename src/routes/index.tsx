import { createFileRoute, redirect } from '@tanstack/react-router'
import { HomePage } from 'pages/HomePage'
import { store } from 'redux/store'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    if (store.getState().user.isLoggedIn) {
      throw redirect({ to: '/dashboard', replace: true })
    }
  },
  component: HomePage
})
