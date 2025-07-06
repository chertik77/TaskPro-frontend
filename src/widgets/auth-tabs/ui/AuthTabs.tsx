import type { ReactNode } from 'react'

import { useLocation, useNavigate } from '@tanstack/react-router'

import { Tabs, TabsList, TabsTrigger } from '@/shared/ui'

export const AuthTabs = ({ children }: { children: ReactNode }) => {
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
