import { createFileRoute, redirect } from '@tanstack/react-router'
import { SignupPage } from 'pages/SignupPage'
import { store } from 'redux/store'

export const Route = createFileRoute('/auth/signup')({
  beforeLoad: () => {
    if (store.getState().user.isLoggedIn) {
      throw redirect({ to: '/dashboard' })
    }
  },
  component: SignupPage
})
