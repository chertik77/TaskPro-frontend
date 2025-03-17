import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useAuthStore } from '@/entities/auth'
import { userService, UserTypes } from '@/entities/user'

export const useChangeTheme = () => {
  const previousUser = useAuthStore(state => state.user)

  const updateUser = useAuthStore(state => state.updateUser)

  return useMutation({
    mutationFn: userService.changeUserTheme,
    onMutate: async (theme: UserTypes.Theme) => {
      updateUser({ theme })

      return { previousUser }
    },
    onError: (_, __, context) => {
      updateUser(context?.previousUser as UserTypes.User)
      toast.error('We couldn’t update your theme. Please try again')
    }
  })
}
