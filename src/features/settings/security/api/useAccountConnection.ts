import { useMutation } from '@tanstack/react-query'
import { useLocation } from '@tanstack/react-router'

import { sessionQueries } from '@/entities/user'

import { authClient, getAuthErrorMessage } from '@/shared/api'
import { env } from '@/shared/config'

type AccountConnectionMutationData = {
  providerId: string
  isConnected: boolean
}

export const useAccountConnection = () => {
  const { href } = useLocation()

  return useMutation({
    mutationFn: async ({
      providerId,
      isConnected
    }: AccountConnectionMutationData) => {
      if (isConnected) return authClient.unlinkAccount({ providerId })

      return authClient.linkSocial({
        provider: providerId,
        callbackURL: env.VITE_BASE_URL + href,
        errorCallbackURL: env.VITE_BASE_URL + href
      })
    },
    meta: {
      invalidates: [sessionQueries.accounts()],
      errorMessage: e => {
        if (e && 'error' in e) {
          return (
            getAuthErrorMessage(e.error.code) ??
            'An error occurred while updating the account connection. Please try again shortly.'
          )
        }
      }
    }
  })
}
