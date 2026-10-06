import { useMutation } from '@tanstack/react-query'
import { useLocation } from '@tanstack/react-router'

import { sessionQueries } from '@/entities/user'

import { authClient, getAuthErrorMessage } from '@/shared/api'
import { getBaseUrl } from '@/shared/config'

type AccountConnectionMutationData = {
  accountId: string | undefined
  providerId: string
  isConnected: boolean
}

export const useAccountConnection = () => {
  const { href } = useLocation()

  return useMutation({
    mutationFn: async ({
      accountId,
      providerId,
      isConnected
    }: AccountConnectionMutationData) => {
      if (isConnected && accountId) {
        return authClient.unlinkAccount({ accountId })
      }

      return authClient.linkSocial({
        provider: providerId,
        callbackURL: getBaseUrl() + href,
        errorCallbackURL: getBaseUrl() + href
      })
    },
    meta: {
      invalidates: [sessionQueries.accounts()],
      errorMessage: e => {
        if (e && 'error' in e) {
          return (
            getAuthErrorMessage(e.error.code) ??
            'An error occurred while updating the account connection. Please try again.'
          )
        }
      }
    }
  })
}
