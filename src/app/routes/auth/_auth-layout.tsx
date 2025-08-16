import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { AuthNavigation } from '@/widgets/auth-navigation'

export const Route = createFileRoute('/auth/_auth-layout')({
  beforeLoad: ({ context: { session } }) => {
    if (session.isAuthenticated) throw redirect({ to: '/dashboard' })
  },
  component: () => (
    <div className='bg-soft-green flex h-dvh items-center justify-center'>
      <div className='tablet:w-[424px] tablet:p-10 w-84 rounded-lg bg-black p-6'>
        <AuthNavigation />
        <Outlet />
      </div>
    </div>
  )
})
