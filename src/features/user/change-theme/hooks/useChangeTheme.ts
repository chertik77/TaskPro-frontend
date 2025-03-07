import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { userService, UserTypes } from '@/entities/user'

export const useChangeTheme = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['changeUserTheme'],
    mutationFn: userService.changeUserTheme,
    onMutate: async (theme: UserTypes.Theme) => {
      await queryClient.cancelQueries({ queryKey: ['user'] })

      const previousUser = queryClient.getQueryData<UserTypes.User>(['user'])

      queryClient.setQueryData<UserTypes.User>(
        ['user'],
        oldUser => oldUser && { ...oldUser, theme }
      )

      return { previousUser }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['user'], context?.previousUser)
      toast.error('We couldn’t update your theme. Please try again')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    }
  })
}
