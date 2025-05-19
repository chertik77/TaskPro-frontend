import { TabsContent } from '@radix-ui/react-tabs'
import { createFileRoute } from '@tanstack/react-router'

import { SignupForm } from '@/features/auth/signup'

const SignupRoute = () => (
  <TabsContent
    value={Route.fullPath}
    className='focus-visible:styled-outline'>
    <SignupForm />
  </TabsContent>
)

export const Route = createFileRoute('/(auth)/_auth-layout/signup')({
  component: SignupRoute
})
