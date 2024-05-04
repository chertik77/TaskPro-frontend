import { useMutation } from '@tanstack/react-query'

import { userService } from 'services/user.service'

export const useUpdateUser = () =>
  useMutation({
    mutationKey: ['user'],
    mutationFn: (theme: string) => userService.changeUserTheme(theme)
  })
