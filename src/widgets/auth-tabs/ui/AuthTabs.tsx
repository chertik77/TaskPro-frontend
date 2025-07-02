import type { ReactNode } from '@tanstack/react-router'

import { useLocation, useNavigate } from '@tanstack/react-router'

import { Tabs, TabsList, TabsTrigger } from '@/shared/ui'

type AuthTabsProps = {
  children: ReactNode
}

export const AuthTabs = ({ children }: AuthTabsProps) => {
  const navigate = useNavigate()

  const { pathname } = useLocation()

  return (
    <Tabs
      className='tablet:w-[424px] w-84'
      value={pathname}
      onValueChange={v => navigate({ to: v })}>
      <TabsList className='mb-10'>
        <TabsTrigger value='/signup'>Registration</TabsTrigger>
        <TabsTrigger value='/signin'>Log In</TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  )
}
