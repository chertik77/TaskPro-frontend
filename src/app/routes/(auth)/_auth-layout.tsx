import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { useAuthStore } from '@/entities/auth'

import { AuthNavigation } from '@/blocks/auth-navigation'

export const Route = createFileRoute('/(auth)/_auth-layout')({
  beforeLoad: () => {
    if (useAuthStore.getState().signedIn()) throw redirect({ to: '/dashboard' })
  },
  component: () => (
    <div className='flex h-dvh items-center justify-center bg-soft-green'>
      <div className='w-84 rounded-lg bg-black p-6 tablet:w-[424px] tablet:p-10'>
        <AuthNavigation />
        <Outlet />
      </div>
    </div>
  )
})
