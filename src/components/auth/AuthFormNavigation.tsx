import { NavLink } from 'react-router-dom'

import { Pages } from 'config'

export const AuthFormNavigation = () => (
  <div className='mb-10 text-lg'>
    <NavLink
      to={Pages.Signup}
      className='focus-visible:styled-outline mr-3.5 text-white/30 aria-[current=page]:text-white'>
      Registration
    </NavLink>
    <NavLink
      to={Pages.Signin}
      className='focus-visible:styled-outline text-white/30 aria-[current=page]:text-white'>
      Log In
    </NavLink>
  </div>
)
