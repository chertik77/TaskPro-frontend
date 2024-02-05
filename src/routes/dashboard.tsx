import { createFileRoute, redirect } from '@tanstack/react-router'
import { store } from 'redux/store'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: () => {
    if (
      !store.getState().user.isLoggedIn &&
      !store.getState().user.isRefreshing
    ) {
      throw redirect({ to: '/', replace: true })
    }
  },
  component: Dashboard
})

function Dashboard() {
  return (
    <div>
      <h1>hello Dashboard</h1>
    </div>
  )
}
