import type { SigninSchema } from 'lib/schemas'
import type { UseFormReset } from 'react-hook-form'
import type { AuthResponse } from 'types'

import { toast } from 'sonner'

import { useAppMutation } from 'hooks/useAppMutation'

import { authService } from 'services'

export const useSigninUser = (reset: UseFormReset<SigninSchema>) =>
  useAppMutation<SigninSchema, AuthResponse>({
    mutationKey: ['signin'],
    mutationFn: data => authService.signin(data),
    onSuccess(data) {
      reset()
      toast.success(
        `Welcome back, ${data.user.name}! We're glad to see you again.`
      )
    },
    onError(error) {
      toast.error(
        error.response?.status === 401
          ? 'Sign-in failed. The email or password you entered is incorrect. Please try again.'
          : 'An error occurred during sign-in. Our technical team has been notified. Please try again shortly.'
      )
    }
  })
