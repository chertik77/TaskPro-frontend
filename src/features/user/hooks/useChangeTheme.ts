import type { Theme } from '../user.constants'
import type { User } from '../user.types'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { UserCacheKeys } from '../config'
import { userService } from '../user.service'

export const useChangeTheme = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [UserCacheKeys.ChangeUserTheme],
    mutationFn: userService.changeUserTheme,
    onMutate: async (theme: Theme) => {
      await queryClient.cancelQueries({ queryKey: [UserCacheKeys.User] })

      const previousUser = queryClient.getQueryData<User>([UserCacheKeys.User])

      queryClient.setQueryData<User>(
        [UserCacheKeys.User],
        oldUser =>
          oldUser && {
            ...oldUser,
            theme
          }
      )

      return { previousUser }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData([UserCacheKeys.User], context?.previousUser)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [UserCacheKeys.User] })
    }
  })
}
