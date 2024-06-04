import { NavLink } from 'react-router-dom'

import { Pages } from 'config'

export const AuthFormNavigation = () => (
  <div className='mb-10 text-lg'>
    <NavLink
      to={Pages.Signup}
      className='mr-3.5 text-white/30 aria-[current=page]:text-white'>
      Registration
    </NavLink>
    <NavLink
      to={Pages.Signin}
      className='text-white/30 aria-[current=page]:text-white'>
      Log In
    </NavLink>
  </div>
)
