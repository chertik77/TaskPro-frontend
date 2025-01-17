import type { UseFormReset } from 'react-hook-form'

import { authService, AuthTypes } from '@/shared/api/auth'
import { useAuthStore } from '@/shared/store'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

export const useSignupUser = (reset: UseFormReset<AuthTypes.SignupSchema>) => {
  const authenticate = useAuthStore(state => state.authenticate)

  const navigate = useNavigate()

  return useMutation({
    mutationKey: ['signup'],
    mutationFn: authService.signup,
    onSuccess(data) {
      reset()
      navigate({ to: '/dashboard' })
      authenticate(data)
    },
    onError: e =>
      toast.error(
        e.response?.status === 409
          ? 'An account with this email address already exists. Please sign in or use a different email.'
          : 'An error occurred during sign-up. Our technical team has been notified. Please try again shortly.'
      )
  })
}
