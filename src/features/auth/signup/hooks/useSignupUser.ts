import type { AuthTypes } from '@/entities/auth'
import type { UseFormReset } from 'react-hook-form'

import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

import { authService, useAuthStore } from '@/entities/auth'

export const useSignupUser = (reset: UseFormReset<AuthTypes.SignupSchema>) => {
  const authenticate = useAuthStore(state => state.authenticate)

  const navigate = useNavigate()

  return useMutation({
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
