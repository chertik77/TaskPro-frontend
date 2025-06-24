import { TabsContent } from '@radix-ui/react-tabs'
import { useLocation } from '@tanstack/react-router'

import { SigninForm } from '@/features/session/signin'

export const SigninPage = () => {
  const { pathname } = useLocation()

  return (
    <TabsContent
      value={pathname}
      className='focus-visible:styled-outline'>
      <SigninForm />
    </TabsContent>
  )
}
