import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/register')({
  component: Register
})

function Register() {
  return <div className='p-2'>Hello from Register!</div>
}
