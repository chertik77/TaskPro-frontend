import type { Theme } from '@/shared/constants'

import { useMutation } from '@tanstack/react-query'
import { parse } from 'valibot'

import { UserContracts } from '@/entities/user'

import { userService } from '@/shared/api/user'
import { useAuthStore } from '@/shared/store'

import { setMetaThemeColor } from '../utils/setMetaThemeColor'

export const useChangeTheme = () => {
  const { user: previousUser, setUser } = useAuthStore()

  return useMutation({
    mutationFn: userService.editUser,
    meta: { errorMessage: 'We couldn’t update your theme. Please try again' },
    onMutate: async ({ theme }) => {
      const previousTheme = previousUser.theme

      setUser(prev => ({ ...prev, theme: theme! }))

      setMetaThemeColor(theme!)

      return { previousTheme }
    },
    onError: (_, _variables, context) => {
      setUser({ ...previousUser, theme: context?.previousTheme as Theme })
    },
    onSettled: data => {
      const parsedData = parse(UserContracts.UserSchema, data)

      setUser(parsedData)
    }
  })
}
