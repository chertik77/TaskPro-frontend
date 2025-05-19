import { TabsContent } from '@radix-ui/react-tabs'
import { createFileRoute } from '@tanstack/react-router'

import { SigninForm } from '@/features/auth/signin'

const SigninRoute = () => (
  <TabsContent
    value={Route.fullPath}
    className='focus-visible:styled-outline'>
    <SigninForm />
  </TabsContent>
)

export const Route = createFileRoute('/(auth)/_auth-layout/signin')({
  component: SigninRoute
})
