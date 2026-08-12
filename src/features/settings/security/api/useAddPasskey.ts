import { useMutation } from '@tanstack/react-query'

import { sessionQueries } from '@/entities/user'

import { authClient, getAuthErrorMessage } from '@/shared/api'
import { toast } from '@/shared/lib'

import { usePasskeyDialogStore } from '../model/passkey-dialog.store'

export const useAddPasskey = () => {
  const { setIsOpen } = usePasskeyDialogStore()

  return useMutation({
    mutationFn: () => authClient.passkey.addPasskey(),
    meta: {
      invalidates: [sessionQueries.passkeys()],
      errorMessage:
        'An error occurred while adding the passkey. Please try again.'
    },
    onSuccess({ error }) {
      if (error && 'code' in error) {
        if (error.code === 'ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY') {
          return toast.warning('Passkey sign-in cancelled.')
        }

        const errorMessage = getAuthErrorMessage(error.code)

        toast.error(errorMessage, {
          description: 'The authenticator is already registered.'
        })
      }

      if (!error) setIsOpen(true)
    }
  })
}
