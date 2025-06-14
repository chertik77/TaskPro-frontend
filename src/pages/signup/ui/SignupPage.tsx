import { TabsContent } from '@radix-ui/react-tabs'
import { useLocation } from '@tanstack/react-router'

import { SignupForm } from '@/features/auth/signup'

export const SignupPage = () => {
  const { pathname } = useLocation()

  return (
    <TabsContent
      value={pathname}
      className='focus-visible:styled-outline'>
      <SignupForm />
    </TabsContent>
  )
}
