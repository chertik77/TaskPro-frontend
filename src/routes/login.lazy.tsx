import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/login')({
  component: Login
})

function Login() {
  return <div className='p-2'>Hello from Login!</div>
}
