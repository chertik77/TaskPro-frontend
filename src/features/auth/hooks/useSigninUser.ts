import type { UseFormReset } from 'react-hook-form'
import type { SigninSchema } from '../auth.schema'

import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

import { authService } from '../auth.service'
import { AuthCacheKeys } from '../config'

export const useSigninUser = (reset: UseFormReset<SigninSchema>) => {
  const navigate = useNavigate()

  return useMutation({
    mutationKey: [AuthCacheKeys.Signin],
    mutationFn: authService.signin,
    onSuccess() {
      reset()
      navigate({ to: '/dashboard' })
    },
    onError: e =>
      toast.error(
        e.response?.status === 401
          ? 'The email or password you entered is incorrect. Please try again.'
          : 'An error occurred during sign-in. Our technical team has been notified. Please try again shortly.'
      )
  })
}
