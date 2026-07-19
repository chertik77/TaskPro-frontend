import { WelcomePage } from '@/pages/welcome'
import {
  createFileRoute,
  redirect,
  stripSearchParams
} from '@tanstack/react-router'
import { toast } from 'sonner'
import * as v from 'valibot'

import { sessionQueries } from '@/entities/user'

export const OauthErrorSearchSchema = v.object({
  error: v.optional(v.pipe(v.string()))
})

export const Route = createFileRoute('/')({
  validateSearch: OauthErrorSearchSchema,
  search: { middlewares: [stripSearchParams({ error: '' })] },
  beforeLoad: async ({ context: { queryClient }, search: { error } }) => {
    const isAuthenticated = await queryClient.ensureQueryData(
      sessionQueries.current()
    )

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
