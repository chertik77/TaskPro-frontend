import { Link } from '@tanstack/react-router'

import { Icon } from '@/shared/ui'

import { SocialButton } from './SocialButton'

export const WelcomePage = () => (
  <div className='bg-soft-green flex h-dvh flex-col items-center justify-center'>
    <img
      className='tablet:size-40.5 size-31'
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
      className='tablet:w-118.25 mt-6 mb-8 w-84 text-center text-base
        text-black'>
      Supercharge your productivity and take control of your tasks with Task Pro
      - Don&apos;t wait, start achieving your goals now!
    </p>
    <div className='space-y-3.5'>
      <SocialButton
        provider='google'
        apiEndpoint='googleInitiate'
      />
      <SocialButton
        provider='microsoft'
        apiEndpoint='microsoftInitiate'
      />
      <Link
        to='/auth/signup'
        className='block w-84 rounded-lg bg-black py-3.5 text-center text-white'>
        Registration
      </Link>
      <Link
        to='/auth/signin'
        className='focus-visible:styled-outline block text-center text-black'>
        Log In
      </Link>
    </div>
  </div>
)
