import { Link } from '@tanstack/react-router'

export const AuthFormNavigation = () => (
  <div className='mb-10 text-fs-18-lh-normal-fw-500'>
    <Link
      to='/auth/signup'
      className='mr-[14px]'
      activeProps={{ className: 'text-white' }}
      inactiveProps={{ className: 'text-white/30' }}>
      Registration
    </Link>
    <Link
      to='/auth/signin'
      activeProps={{ className: 'text-white' }}
      inactiveProps={{ className: 'text-white/30' }}>
      Log In
    </Link>
  </div>
)
