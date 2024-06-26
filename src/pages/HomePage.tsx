import { Link } from 'react-router-dom'

import { GoogleButton } from 'components/GoogleButton'

import { useTabletAndBelowMediaQuery } from 'hooks'
import { useGoogleOneTap } from 'hooks/auth'

import { Pages } from 'config'

import { cn } from 'lib'

export const HomePage = () => {
  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  useGoogleOneTap()

  return (
    <div className='flex h-dvh flex-col items-center justify-center bg-welcome-page-gradient'>
      <picture>
        <source
          media='(min-width: 768px)'
          srcSet='/images/Welcome_tab_desktop.avif 1x, /images/Welcome_tab_desktop@2x.avif 2x'
        />
        <source
          media='(max-width: 767px)'
          srcSet='/images/Welcome_phone.avif 1x, /images/Welcome_phone@2x.avif 2x'
        />
        <img
          src='images/Welcome_tab_desktop.avif'
          alt='user-with-notebook'
          loading='lazy'
        />
      </picture>
      <div className='mt-6 flex items-center gap-3.5'>
        <svg className='size-10 tablet:size-12'>
          <use href='/icons.svg#icon-logo' />
        </svg>
        <h1 className='text-3xl text-black tablet:text-4xl'>Task Pro</h1>
      </div>
      <p className='mb-8 mt-6 w-8xl text-center text-base text-black tablet:w-[473px]'>
        Supercharge your productivity and take control of your tasks with Task
        Pro - Don&apos;t wait, start achieving your goals now!
      </p>
      <GoogleButton />
      <Link
        to={Pages.Signup}
        className={cn(
          'w-8xl rounded-lg bg-black py-3.5 text-center text-white',
          isTabletAndBelow && 'mt-3.5'
        )}>
        Registration
      </Link>
      <Link
        to={Pages.Signin}
        className='mt-3.5 text-black'>
        Log In
      </Link>
    </div>
  )
}
