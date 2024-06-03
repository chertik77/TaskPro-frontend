import { Link } from 'react-router-dom'

export const HomePage = () => (
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
      <h1 className='text-3xl tablet:text-4xl'>Task Pro</h1>
    </div>
    <p className='mt-6 w-8xl text-center text-base tablet:w-[473px]'>
      Supercharge your productivity and take control of your tasks with Task Pro
      - Don&apos;t wait, start achieving your goals now!
    </p>
    <Link
      to='/auth/signup'
      className='mt-12 w-8xl rounded-lg bg-black py-3.5 text-center text-white'>
      Registration
    </Link>
    <Link
      to='/auth/signin'
      className='mt-3.5'>
      Log In
    </Link>
  </div>
)
