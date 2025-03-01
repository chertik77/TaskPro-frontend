import { Link } from '@tanstack/react-router'

export const AuthNavigation = () => (
  <ul className='mb-10 flex items-center gap-3.5 text-xl'>
    <li>
      <Link
        to='/signup'
        className='focus-visible:styled-outline text-white/30 aria-[current=page]:text-white'>
        Registration
      </Link>
    </li>
    <li>
      <Link
        to='/signin'
        className='focus-visible:styled-outline text-white/30 aria-[current=page]:text-white'>
        Log In
      </Link>
    </li>
  </ul>
)
