import { createFileRoute, Link, redirect } from '@tanstack/react-router'

import { GoogleSignin } from '@/features/auth/google'

import { useAuthStore } from '@/shared/store'
import { Icon } from '@/shared/ui'

const IndexRoute = () => (
  <div className='flex h-dvh flex-col items-center justify-center bg-soft-green'>
    <img
      className='size-[124px] tablet:size-[162px]'
      src='https://res.cloudinary.com/dmbnnewoy/image/upload/v1733568457/TaskPro/welcome.png'
      alt='User with notebook'
    />
    <div className='mt-6 flex items-center gap-3.5 text-white'>
      <Icon
        name='logo'
        className='size-10 tablet:size-12'
      />
      <h1 className='text-2xl text-black tablet:text-3xl'>Task Pro</h1>
    </div>
    <p className='mb-8 mt-6 w-84 text-center text-base text-black tablet:w-[473px]'>
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
    if (useAuthStore.getState().signedIn()) throw redirect({ to: '/dashboard' })
  },
  component: IndexRoute
})
