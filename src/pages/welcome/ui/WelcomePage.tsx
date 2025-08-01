import { Link } from '@tanstack/react-router'

import { ContinueWithGoogleButton } from '@/features/session/google'

import { Icon } from '@/shared/ui'

export const WelcomePage = () => (
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
    <p
      className='tablet:w-[473px] mt-6 mb-8 w-84 text-center text-base
        text-black'>
      Supercharge your productivity and take control of your tasks with Task Pro
      - Don&apos;t wait, start achieving your goals now!
    </p>
    <ContinueWithGoogleButton />
    <Link
      to='/auth/signup'
      preload={false}
      className='mt-3.5 w-84 rounded-lg bg-black py-3.5 text-center text-white'>
      Registration
    </Link>
    <Link
      to='/auth/signin'
      preload={false}
      className='focus-visible:styled-outline mt-3.5 text-black'>
      Log In
    </Link>
  </div>
)
