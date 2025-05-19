import type { ReactNode } from '@tanstack/react-router'

import * as Tabs from '@radix-ui/react-tabs'
import { useLocation, useNavigate } from '@tanstack/react-router'

type AuthTabsProps = {
  children: ReactNode
}

export const AuthTabs = ({ children }: AuthTabsProps) => {
  const navigate = useNavigate()

  const { pathname } = useLocation()

  return (
    <Tabs.Root
      value={pathname}
      onValueChange={v => navigate({ to: v })}>
      <Tabs.List className='mb-10 flex items-center gap-3.5 text-xl'>
        <Tabs.Trigger
          value='/signup'
          className='focus-visible:styled-outline text-white/30 data-[state=active]:text-white'>
          Registration
        </Tabs.Trigger>
        <Tabs.Trigger
          value='/signin'
          className='focus-visible:styled-outline text-white/30 data-[state=active]:text-white'>
          Log In
        </Tabs.Trigger>
      </Tabs.List>
      {children}
    </Tabs.Root>
  )
}
