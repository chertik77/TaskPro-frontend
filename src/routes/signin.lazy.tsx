import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/signin')({
  component: Signin
})

function Signin() {
  return <div className='p-2'>Hello from Login!</div>
}
