import type { UseFormReset } from 'react-hook-form'

import { authService, AuthTypes } from '@/shared/api/auth'
import { useAuthStore } from '@/shared/store'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

export const useSigninUser = (reset: UseFormReset<AuthTypes.SigninSchema>) => {
  const authenticate = useAuthStore(state => state.authenticate)

  const navigate = useNavigate()

  return useMutation({
    mutationKey: ['signin'],
    mutationFn: authService.signin,
    onSuccess(data) {
      reset()
      navigate({ to: '/dashboard' })
      authenticate(data)
    },
    onError: e =>
      toast.error(
        e.response?.status === 401
          ? 'The email or password you entered is incorrect. Please try again.'
          : 'An error occurred during sign-in. Our technical team has been notified. Please try again shortly.'
      )
  })
}
