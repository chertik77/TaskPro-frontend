import { useLocation } from '@tanstack/react-router'

import { SigninForm } from '@/features/session/signin'

import { TabsContent } from '@/shared/ui'

export const SigninPage = () => {
  const { pathname } = useLocation()

  return (
    <TabsContent value={pathname}>
      <SigninForm />
    </TabsContent>
  )
}
