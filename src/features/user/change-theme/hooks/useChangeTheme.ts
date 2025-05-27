import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { parse } from 'valibot'

import { UserContracts } from '@/entities/user'

import { userService } from '@/shared/api/user'
import { useAuthStore } from '@/shared/store'

export const useChangeTheme = () => {
  const { user: previousUser, setUser } = useAuthStore()

  return useMutation({
    mutationFn: userService.editUser,
    onMutate: async ({ theme }) => {
      setUser(prev => ({ ...prev, theme: theme! }))
    },
    onError: () => {
      setUser(previousUser)
      toast.error('We couldn’t update your theme. Please try again')
    },
    onSettled: data => {
      const parsedData = parse(UserContracts.UserSchema, data)

      setUser(parsedData)
    }
  })
}
