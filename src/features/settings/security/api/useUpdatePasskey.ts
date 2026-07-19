import { useMutation } from '@tanstack/react-query'

import { sessionQueries } from '@/entities/user'

import { authClient } from '@/shared/api'

type UpdatePasskeyMutation = {
  id: string
  name: string
}

export const useUpdatePasskey = (closeDialog: () => void) =>
  useMutation({
    mutationFn: (data: UpdatePasskeyMutation) =>
      authClient.passkey.updatePasskey(data),
    meta: {
      invalidates: [sessionQueries.passkeys()],
      errorMessage:
        'An error occurred while updating the passkey. Please try again shortly.'
    },
    onSuccess() {
      closeDialog()
    }
  })
