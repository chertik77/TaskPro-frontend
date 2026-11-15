import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { clearUserCache } from '@/entities/user'

import { authClient, authErrorMessage } from '@/shared/api'

export const useDeleteAccount = (closeDialog: () => void) => {
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (password: string | undefined) =>
      authClient.deleteUser(password ? { password } : {}),
    meta: {
      errorMessage: authErrorMessage(
        'We couldn’t delete your account. Please try again.'
      )
    },
    onSuccess() {
      closeDialog()
      clearUserCache(queryClient)
      navigate({ to: '/' })
    }
  })
}
