import { createFileRoute } from '@tanstack/react-router'

const RouteComponent = () => <div>Hello passkey</div>

export const Route = createFileRoute('/auth/passkey')({
  component: RouteComponent
})
