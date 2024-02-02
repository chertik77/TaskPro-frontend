import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/about')({
  component: About
})

function About() {
  return <div className='text-black'>Hello from About!</div>
}
