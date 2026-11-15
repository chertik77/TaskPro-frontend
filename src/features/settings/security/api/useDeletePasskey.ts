import { useMutation, useQueryClient } from '@tanstack/react-query'

import { sessionQueries } from '@/entities/user'

import { authClient } from '@/shared/api'
import { setOptimisticData } from '@/shared/lib'

export const useDeletePasskey = () => {
  const queryClient = useQueryClient()

  const allPasskeysQueryKey = sessionQueries.passkey().queryKey

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      authClient.passkey.deletePasskey({ id }),
    meta: {
      errorMessage:
        'An error occurred while deleting the passkey. Please try again.'
    },
    onMutate: ({ id: passkeyId }) =>
      setOptimisticData(queryClient, allPasskeysQueryKey, passkeys =>
        passkeys.filter(passkey => passkey.id !== passkeyId)
      ),
    onError: (_, __, context) => context?.rollback(),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: allPasskeysQueryKey })
    }
  })
}
