import { Link } from '@tanstack/react-router'
import { Logo, Picture } from 'components/pages/HomePage/Images'

export const HomePage = () => (
  <div className='w-screen h-screen adaptive:px-5 flex justify-center items-center flex-col bg-welcome-page-gradient'>
    <Picture />
    <div className='flex gap-[14px] items-center mt-6'>
      <Logo />
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
