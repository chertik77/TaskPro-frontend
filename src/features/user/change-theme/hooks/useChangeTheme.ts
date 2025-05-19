import type { UserTypes } from '@/entities/user'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { userService } from '@/shared/api/user'
import { useAuthStore } from '@/shared/store'

export const useChangeTheme = () => {
  const { user: previousUser } = useAuthStore()

  const { setUser } = useAuthStore()

  return useMutation({
    mutationFn: userService.changeUserTheme,
    onMutate: async ({ theme }) => {
      setUser(prev => ({ ...prev, theme }))

      return { previousUser }
    },
    onError: (_, __, context) => {
      setUser(context?.previousUser as UserTypes.UserSchema)
      toast.error('We couldn’t update your theme. Please try again')
    },
    onSettled: data => {
      setUser(data as UserTypes.UserSchema)
    }
  })
}
