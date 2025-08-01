import type { Theme } from '@/shared/config'

import { useMutation } from '@tanstack/react-query'
import { parse } from 'valibot'

import { useSessionStore } from '@/entities/session'
import { UserContracts, userService } from '@/entities/user'

export const useChangeTheme = () => {
  const { user: previousUser, setUser } = useSessionStore()

  return useMutation({
    mutationFn: userService.editUser,
    meta: { errorMessage: 'We couldn’t update your theme. Please try again' },
    onMutate: async ({ theme }) => {
      const previousTheme = previousUser.theme

      setUser(prev => ({ ...prev, theme: theme! }))

      return { previousTheme }
    },
    onError: (_, _variables, context) => {
      setUser({ ...previousUser, theme: context?.previousTheme as Theme })
    },
    onSettled: data => {
      const parsedUser = parse(UserContracts.UserSchema, data)

      setUser(parsedUser)
    }
  })
}
