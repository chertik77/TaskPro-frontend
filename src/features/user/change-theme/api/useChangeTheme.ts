import type { Theme } from '@/shared/config'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { sessionQueries } from '@/entities/user'

import { authClient } from '@/shared/api'

export const useChangeTheme = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ theme }: { theme: Theme }) =>
      authClient.updateUser({ theme }),
    meta: { errorMessage: 'We couldn’t update your theme. Please try again' },
    onMutate: async ({ theme }) => {
      await queryClient.cancelQueries({ queryKey: sessionQueries.all() })

      const previousSession = queryClient.getQueryData(sessionQueries.all())

      queryClient.setQueryData(
        sessionQueries.current().queryKey,
        oldSession => {
          if (!oldSession?.user) return oldSession

          return { ...oldSession, user: { ...oldSession.user, theme } }
        }
      )

      return { previousSession }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(sessionQueries.all(), context?.previousSession)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: sessionQueries.all() })
    }
  })
}
