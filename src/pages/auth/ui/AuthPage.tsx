import { useLocation, useNavigate } from '@tanstack/react-router'

import { SigninForm } from '@/features/session/signin'
import { SignupForm } from '@/features/session/signup'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui'

export const AuthPage = () => {
  const { pathname } = useLocation()

  const navigate = useNavigate()

  const signupTabValue = '/auth/signup'
  const signinTabValue = '/auth/signin'

  return (
    <Tabs
      className='tablet:w-[424px] w-84'
      value={pathname}
      onValueChange={v => navigate({ to: v })}>
      <TabsList className='mb-10'>
        <TabsTrigger value={signupTabValue}>Registration</TabsTrigger>
        <TabsTrigger value={signinTabValue}>Log In</TabsTrigger>
      </TabsList>
      <TabsContent value={signupTabValue}>
        <SignupForm />
      </TabsContent>
      <TabsContent value={signinTabValue}>
        <SigninForm />
      </TabsContent>
    </Tabs>
  )
}
