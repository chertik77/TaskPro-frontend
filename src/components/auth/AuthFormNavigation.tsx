import { NavLink } from 'react-router-dom'

export const AuthFormNavigation = () => (
  <div className='mb-10 text-lg'>
    <NavLink
      to='/auth/signup'
      className='mr-3.5 text-white/30 aria-[current=page]:text-white'>
      Registration
    </NavLink>
    <NavLink
      to='/auth/signin'
      className='text-white/30 aria-[current=page]:text-white'>
      Log In
    </NavLink>
  </div>
)
