import type { Theme } from '../user.constants'
import type { User } from '../user.types'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

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
        oldUser => oldUser && { ...oldUser, theme }
      )

      return { previousUser }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData([UserCacheKeys.User], context?.previousUser)
      toast.error('We couldn’t update your theme. Please try again')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [UserCacheKeys.User] })
    }
  })
}
