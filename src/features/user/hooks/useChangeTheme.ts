import { userService, UserTypes } from '@/shared/api/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { UserCacheKeys } from '../config'

export const useChangeTheme = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [UserCacheKeys.ChangeUserTheme],
    mutationFn: userService.changeUserTheme,
    onMutate: async (theme: UserTypes.Theme) => {
      await queryClient.cancelQueries({ queryKey: [UserCacheKeys.User] })

      const previousUser = queryClient.getQueryData<UserTypes.User>([
        UserCacheKeys.User
      ])

      queryClient.setQueryData<UserTypes.User>(
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
