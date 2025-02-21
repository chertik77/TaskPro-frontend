import { Link } from '@tanstack/react-router'

export const AuthNavigation = () => (
  <div className='mb-10 text-xl'>
    <Link
      to='/signup'
      className='focus-visible:styled-outline mr-3.5 text-white/30 aria-[current=page]:text-white'>
      Registration
    </Link>
    <Link
      to='/signin'
      className='focus-visible:styled-outline text-white/30 aria-[current=page]:text-white'>
      Log In
    </Link>
  </div>
)
