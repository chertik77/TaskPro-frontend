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
          return toast.warning('Passkey registration cancelled.')
        }

        if (error.code === 'ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED') {
          return toast.error('This authenticator may be already registered.')
        }

        return toast.error(
          getAuthErrorMessage(error.code) ??
            'We couldn’t add this passkey. Please try again.'
        )
      }

      setIsOpen(true)
    }
  })
}
