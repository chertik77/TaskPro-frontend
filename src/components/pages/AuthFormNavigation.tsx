import { Link } from 'react-router-dom'

export const AuthFormNavigation = () => (
  <div className='mb-10 text-fs-18-lh-normal-fw-500'>
    <Link
      to='/auth/signup'
      className='mr-[14px] text-white/30 aria-[current=page]:text-white'>
      Registration
    </Link>
    <Link to='/auth/signin text-white/30 aria-[current=page]:text-white'>
      Log In
    </Link>
  </div>
)
