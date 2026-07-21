import { useMutation, useQueryClient } from '@tanstack/react-query'

import { sessionQueries } from '@/entities/user'

import { authClient } from '@/shared/api'

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
    onMutate: async ({ id: passkeyId }) => {
      await queryClient.cancelQueries({ queryKey: allPasskeysQueryKey })

      const previousPasskeys = queryClient.getQueryData(allPasskeysQueryKey)

      queryClient.setQueryData(allPasskeysQueryKey, oldPasskeys => {
        if (!oldPasskeys) return oldPasskeys

        return {
          ...oldPasskeys,
          passkeys: oldPasskeys?.filter(passkey => passkey.id !== passkeyId)
        }
      })

      return { previousPasskeys }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(allPasskeysQueryKey, context?.previousPasskeys)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: allPasskeysQueryKey })
    }
  })
}
