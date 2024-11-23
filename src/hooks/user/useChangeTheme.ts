import type { Theme } from 'constants/themes'
import type { User } from 'types'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { userService } from 'services'

export const useChangeTheme = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['changeTheme'],
    mutationFn: userService.changeUserTheme,
    onMutate: async (theme: Theme) => {
      await queryClient.cancelQueries({ queryKey: ['user'] })

      const previousUser = queryClient.getQueryData<User>(['user'])

      queryClient.setQueryData<User>(
        ['user'],
        oldUser =>
          oldUser && {
            ...oldUser,
            theme
          }
      )

      return { previousUser }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['user'], context?.previousUser)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    }
  })
}
