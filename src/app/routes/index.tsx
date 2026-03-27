import { WelcomePage } from '@/pages/welcome'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { toast } from 'sonner'

import { SessionDtoContracts } from '@/entities/session'
import { userQueries } from '@/entities/user'

export const Route = createFileRoute('/')({
  validateSearch: SessionDtoContracts.OauthErrorSearchSchema,
  beforeLoad: async ({ context: { queryClient }, search: { error } }) => {
    const isAuthenticated = await queryClient.ensureQueryData(userQueries.me())

    if (isAuthenticated) throw redirect({ to: '/dashboard' })

    if (!error) return

    switch (error) {
      case 'access_denied':
        toast.info('Sign-in cancelled', {
          description:
            'It looks like you cancelled the sign-in. You can try again or use a different sign-in method.'
        })
        throw redirect({ to: '/', replace: true })

      default:
        toast.error('Sign-in failed', {
          description:
            'Something went wrong while signing you in. Please try again in a moment or use a different method.',
          duration: 7000
        })
        throw redirect({ to: '/', replace: true })
    }
  },
  component: WelcomePage
})
