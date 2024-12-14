import type { Theme } from 'constants/themes'
import type { User } from 'types'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { CacheKeys } from 'config'
import { userService } from 'services'

export const useChangeTheme = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [CacheKeys.ChangeUserTheme],
    mutationFn: userService.changeUserTheme,
    onMutate: async (theme: Theme) => {
      await queryClient.cancelQueries({ queryKey: [CacheKeys.User] })

      const previousUser = queryClient.getQueryData<User>([CacheKeys.User])

      queryClient.setQueryData<User>(
        [CacheKeys.User],
        oldUser =>
          oldUser && {
            ...oldUser,
            theme
          }
      )

      return { previousUser }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData([CacheKeys.User], context?.previousUser)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [CacheKeys.User] })
    }
  })
}
