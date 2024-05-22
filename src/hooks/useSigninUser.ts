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
          ? 'Invalid email or password. Please try again.'
          : 'Oops! Something went wrong during sign-in. Please check your details and try again.'
      )
    }
  })
