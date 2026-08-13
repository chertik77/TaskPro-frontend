import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { sessionQueries } from '@/entities/user'

import { authClient, getAuthErrorMessage } from '@/shared/api'
import { toast } from '@/shared/lib'

export const usePasskeySignin = () => {
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  return useMutation({
    mutationFn: () => authClient.signIn.passkey(),
    meta: {
      errorMessage:
        'An error occurred while signing in with passkey. Please try again.'
    },
    onSuccess({ data: session, error }) {
      if (error && 'code' in error) {
        if (error.code === 'ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY') {
          return toast.warning('Passkey sign-in cancelled.')
        }

        const errorMessage = getAuthErrorMessage(error.code)

        toast.error(errorMessage, {
          description: 'Try another sign-in method.'
        })
      }

      queryClient.setQueryData(sessionQueries.currents(), session)
      navigate({ to: '/dashboard' })
    }
  })
}
