import type { Theme } from '@/shared/config'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { parse } from 'valibot'

import { UserContracts, userQueries } from '@/entities/user'

import { authClient } from '@/shared/api'

export const useChangeTheme = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ theme }: { theme: Theme }) =>
      authClient.updateUser({ theme }),
    meta: { errorMessage: 'We couldn’t update your theme. Please try again' },
    onMutate: async ({ theme }) => {
      await queryClient.cancelQueries({ queryKey: userQueries.current() })

      const previousUser = queryClient.getQueryData(userQueries.current())

      const parsedPreviousUser = parse(UserContracts.UserSchema, previousUser)

      queryClient.setQueryData(userQueries.current(), oldUser => {
        if (!oldUser) return oldUser

        const parsedOldUser = parse(UserContracts.UserSchema, oldUser)

        return { ...parsedOldUser, theme }
      })

      return { previousUser: parsedPreviousUser }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(userQueries.current(), context?.previousUser)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: userQueries.current() })
    }
  })
}
