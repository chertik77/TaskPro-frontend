import { Link } from '@tanstack/react-router'

export const GlobalError = () => (
  <div className='bg-soft-green flex h-dvh items-center justify-center'>
    <div className='flex flex-col items-center justify-center'>
      <img
        src='https://res.cloudinary.com/dmbnnewoy/image/upload/v1748648905/TaskPro/sad-cactus.png'
        className='tablet:size-40.5 size-31'
        alt='Sad cactus'
      />
      <h3 className='mb-6 text-xl'>Something went wrong.</h3>
      <p
        className='text-md tablet:w-121.5 tablet:text-base mb-9 w-84 text-center
          text-black/70 dark:text-white/50'>
        We are sorry, but something went wrong on our side. Try refreshing the
        page or contact our support team for further assistance.
      </p>
      <Link
        className='block w-84 rounded-lg bg-black py-3.5 text-center text-white'
        to='/'>
        Go home
      </Link>
    </div>
  </div>
)
