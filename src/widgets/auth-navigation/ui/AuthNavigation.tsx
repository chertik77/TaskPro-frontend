import {
  RovingFocusGroup,
  RovingFocusGroupItem
} from '@radix-ui/react-roving-focus'
import { Link } from '@tanstack/react-router'

export const AuthNavigation = () => (
  <RovingFocusGroup className='mb-10 flex items-center gap-3.5 text-xl'>
    <RovingFocusGroupItem asChild>
      <Link
        to='/auth/signup'
        className='focus-visible:styled-outline text-white/30
          aria-[current=page]:text-white'>
        Registration
      </Link>
    </RovingFocusGroupItem>
    <RovingFocusGroupItem asChild>
      <Link
        to='/auth/signin'
        className='focus-visible:styled-outline text-white/30
          aria-[current=page]:text-white'>
        Log In
      </Link>
    </RovingFocusGroupItem>
  </RovingFocusGroup>
)
