import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { sessionQueries } from '@/entities/user'

import { authClient } from '@/shared/api'

import { usePasskeyDialogStore } from '../model/passkey-dialog.store'

export const useAddPasskey = () => {
  const { setIsOpen } = usePasskeyDialogStore()

  return useMutation({
    mutationFn: () => authClient.passkey.addPasskey(),
    meta: {
      invalidates: [sessionQueries.passkeys()],
      errorMessage:
        'An error occurred while adding the passkey. Please try again shortly.'
    },
    onSuccess({ error }) {
      if (error?.message === 'Previously registered') {
        toast.error('Unable to register passkey.', {
          description: 'The authenticator is already registered.'
        })
      }

      if (!error) setIsOpen(true)
    }
  })
}
