import { useMutation } from '@tanstack/react-query'

import { sessionQueries } from '@/entities/user'

import { authClient } from '@/shared/api'

export const useDeletePasskey = () =>
  useMutation({
    mutationFn: ({ id }: { id: string }) =>
      authClient.passkey.deletePasskey({ id }),
    meta: {
      invalidates: [sessionQueries.passkeys()],
      errorMessage:
        'An error occurred while deleting the passkey. Please try again shortly.'
    }
  })
