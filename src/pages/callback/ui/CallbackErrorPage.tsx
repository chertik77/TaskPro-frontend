import { Link } from '@tanstack/react-router'

export const CallbackErrorPage = () => (
  <div className='bg-soft-green flex h-dvh items-center justify-center'>
    <div className='flex flex-col items-center justify-center'>
      <img
        src='https://res.cloudinary.com/dmbnnewoy/image/upload/v1748648905/TaskPro/sad-cactus.png'
        className='tablet:size-[162px] size-[124px]'
        alt='Sad cactus'
      />
      <h3 className='mb-6 text-xl'>We could not sign you in.</h3>
      <p
        className='text-md tablet:w-[486px] tablet:text-base mb-9 w-84
          text-center text-black/70 dark:text-white/50'>
        This might be due to a temporary glitch, a network issue, or a problem
        on our end. Please try again or choose a different method.
      </p>
      <Link
        className='block w-84 rounded-lg bg-black py-3.5 text-center text-white'
        to='/'>
        Go home
      </Link>
    </div>
  </div>
)
