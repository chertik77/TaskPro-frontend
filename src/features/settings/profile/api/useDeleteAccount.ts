import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { authClient, getAuthErrorMessage } from '@/shared/api'

export const useDeleteAccount = (closeDialog: () => void) => {
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (password: string | undefined) =>
      authClient.deleteUser(password ? { password } : {}),
    meta: {
      errorMessage: e => {
        if (e && 'error' in e) {
          return (
            getAuthErrorMessage(e.error.code) ??
            'We couldn’t delete your account. Please try again.'
          )
        }
      }
    },
    onSuccess() {
      closeDialog()
      queryClient.clear()
      navigate({ to: '/' })
    }
  })
}
