import { Link } from '@tanstack/react-router'

export const HomePage = () => (
  <div className='h-dvh adaptive:px-5 flex justify-center items-center flex-col bg-welcome-page-gradient'>
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
        className='user-with-notebook'
        src='images/Welcome_tab_desktop.avif'
        alt='user-with-notebook'
        loading='lazy'
      />
    </picture>
    <div className='flex gap-[14px] items-center mt-6'>
      <svg className='w-10 h-10 tablet:w-12 tablet:h-12'>
        <use xlinkHref='/assets/icons.svg#icon-logo' />
      </svg>
      <h1 className='text-fs-28-lh-normal-fw-600 tablet:text-fs-40-lh-normal-fw-600 text-black'>
        Task Pro
      </h1>
    </div>
    <p className='text-fs-14-lh-1.28-fw-400 w-[335px] tablet:w-[473px] text-black mt-6 text-center adaptive:w-full'>
      Supercharge your productivity and take control of your tasks with Task Pro
      - Don't wait, start achieving your goals now!
    </p>
    <ul className='mt-12 flex flex-col gap-[14px] justify-center items-center adaptive:w-full'>
      <li className='adaptive:w-full'>
        <Link
          to='/auth/signup'
          className='w-[335px] h-[49px] rounded-lg bg-black text-fs-14-lh-normal-fw-500 text-white text-center py-[14px] inline-block adaptive:w-full'>
          Registration
        </Link>
      </li>
      <li className='text-fs-14-lh-normal-fw-500 text-black'>
        <Link to='/auth/signin'>Log In</Link>
      </li>
    </ul>
  </div>
)
