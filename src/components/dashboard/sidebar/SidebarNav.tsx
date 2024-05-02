import { Link } from 'react-router-dom'

export const SidebarNav = () => (
  <div className='mb-[70px] flex items-center gap-2 tablet:mb-[60px] desktop:px-6 desktop:pt-6 '>
    <Link to='/dashboard'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='32'
        height='32'>
        <path
          d='M24 0H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h16a8 8 0 0 0 8-8V8a8 8 0 0 0-8-8Z'
          className='fill-black-third violet:fill-white-gray-secondary'
        />
        <path
          d='M13.331 23.027c.245-1.272.453-2.61.747-3.949.145-.7-.031-1-.814-.946-.784.054-1.657.027-2.49 0-.833-.026-.982-.446-.502-1.044 2.362-2.918 4.752-5.8 7.133-8.673.267-.326.575-.558 1.014-.313.44.246.349.55.276.915-.262 1.339-.48 2.677-.77 3.989-.149.678.046.919.752.892a21.142 21.142 0 0 1 2.128 0c.403 0 .932-.21 1.14.34.209.548-.23.78-.452 1.106a304.398 304.398 0 0 1-2.752 3.342c-1.361 1.624-2.712 3.242-4.052 4.854-.262.317-.556.571-1.005.41-.448-.16-.353-.54-.353-.923Z'
          className='fill-white violet:fill-brand-secondary'
        />
      </svg>
    </Link>
    <div className='text-fs-16-lh-normal-fw-600'>
      <span className='text-black violet:text-white dark:text-white'>
        Task Pro
      </span>
    </div>
  </div>
)
