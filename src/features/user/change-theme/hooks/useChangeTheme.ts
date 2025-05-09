import type { UserTypes } from '@/entities/user'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { userService } from '@/shared/api/user'
import { useAuthStore } from '@/shared/store'

export const useChangeTheme = () => {
  const previousUser = useAuthStore(state => state.user)

  const updateUser = useAuthStore(state => state.updateUser)

  return useMutation({
    mutationFn: userService.changeUserTheme,
    onMutate: async ({ theme }) => {
      updateUser({ theme })

      return { previousUser }
    },
    onError: (_, __, context) => {
      updateUser(context?.previousUser as UserTypes.UserSchema)
      toast.error('We couldn’t update your theme. Please try again')
    },
    onSettled: data => {
      updateUser(data as UserTypes.UserSchema)
    }
  })
}
