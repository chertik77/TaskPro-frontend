import { createFileRoute, Link, redirect } from '@tanstack/react-router'

import { GoogleSignin } from '@/features/auth/google'

import { getAuthStore } from '@/shared/store'
import { Icon } from '@/shared/ui'

const IndexRoute = () => (
  <div className='bg-soft-green flex h-dvh flex-col items-center justify-center'>
    <img
      className='tablet:size-[162px] size-[124px]'
      src='https://res.cloudinary.com/dmbnnewoy/image/upload/v1733568457/TaskPro/welcome.png'
      alt='User with notebook'
    />
    <div className='mt-6 flex items-center gap-3.5 text-white'>
      <Icon
        name='logo'
        className='tablet:size-12 size-10'
      />
      <h1 className='tablet:text-3xl text-2xl text-black'>Task Pro</h1>
    </div>
    <p className='tablet:w-[473px] mt-6 mb-8 w-84 text-center text-base text-black'>
      Supercharge your productivity and take control of your tasks with Task Pro
      - Don&apos;t wait, start achieving your goals now!
    </p>
    <GoogleSignin />
    <Link
      to='/signup'
      className='mt-3.5 w-84 rounded-lg bg-black py-3.5 text-center text-white'>
      Registration
    </Link>
    <Link
      to='/signin'
      className='focus-visible:styled-outline mt-3.5 text-black'>
      Log In
    </Link>
  </div>
)

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    if (getAuthStore().isAuthenticated) throw redirect({ to: '/dashboard' })
  },
  component: IndexRoute
})
