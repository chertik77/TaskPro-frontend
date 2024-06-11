import type { User } from 'types'

import { useQueryClient } from '@tanstack/react-query'

import { useAppMutation } from 'hooks'

import { userService } from 'services'

export const useChangeTheme = () => {
  const queryClient = useQueryClient()

  return useAppMutation<string, User>({
    mutationKey: ['changeTheme'],
    mutationFn: userService.changeUserTheme,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    toastErrorMessage:
      'There was an error changing the theme. Please try again.'
  })
}
