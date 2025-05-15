import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { AuthTabs } from '@/blocks/auth-tabs'

import { useAuthStore } from '@/shared/store'

export const Route = createFileRoute('/(auth)/_auth-layout')({
  beforeLoad: () => {
    if (useAuthStore.getState().signedIn()) throw redirect({ to: '/dashboard' })
  },
  component: () => (
    <div className='bg-soft-green flex h-dvh items-center justify-center'>
      <div className='tablet:w-[424px] tablet:p-10 w-84 rounded-lg bg-black p-6'>
        <AuthTabs />
        <Outlet />
      </div>
    </div>
  )
})
