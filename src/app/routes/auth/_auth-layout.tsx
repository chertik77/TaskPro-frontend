import {
  RovingFocusGroup,
  RovingFocusGroupItem
} from '@radix-ui/react-roving-focus'
import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router'

import { userQueries } from '@/entities/user'

export const Route = createFileRoute('/auth/_auth-layout')({
  beforeLoad: async ({ context: { queryClient } }) => {
    const isAuthenticated = await queryClient.ensureQueryData(userQueries.me())

    if (isAuthenticated) throw redirect({ to: '/dashboard' })
  },
  component: () => (
    <div className='fixed top-0 right-0 block h-12 w-screen'>
      <div className='bg-soft-green flex h-screen items-center justify-center'>
        <div className='tablet:w-106 tablet:p-10 w-84 rounded-lg bg-black p-6'>
          <RovingFocusGroup className='mb-10 flex items-center gap-3.5 text-xl'>
            <RovingFocusGroupItem asChild>
              <Link
                to='/auth/signup'
                className='focus-visible:styled-outline text-white/30
                  aria-[current=page]:text-white'>
                Registration
              </Link>
            </RovingFocusGroupItem>
            <RovingFocusGroupItem asChild>
              <Link
                to='/auth/signin'
                className='focus-visible:styled-outline text-white/30
                  aria-[current=page]:text-white'>
                Log In
              </Link>
            </RovingFocusGroupItem>
          </RovingFocusGroup>
          <Outlet />
        </div>
      </div>
    </div>
  )
})
