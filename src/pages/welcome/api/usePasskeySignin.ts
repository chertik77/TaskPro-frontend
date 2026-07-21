import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

import { sessionQueries } from '@/entities/user'

import { authClient, getAuthErrorMessage } from '@/shared/api'

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
      //! TODO: handle error

      if (error && 'code' in error) {
        const errorMessage = getAuthErrorMessage(error.code)

        toast.error(errorMessage, {
          description: 'Try another sign-in method.'
        })
      }

      queryClient.setQueryData(sessionQueries.all(), session)
      navigate({ to: '/dashboard' })
    }
  })
}
