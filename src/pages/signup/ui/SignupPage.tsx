import { useLocation } from '@tanstack/react-router'

import { SignupForm } from '@/features/session/signup'

import { TabsContent } from '@/shared/ui'

export const SignupPage = () => {
  const { pathname } = useLocation()

  return (
    <TabsContent value={pathname}>
      <SignupForm />
    </TabsContent>
  )
}
