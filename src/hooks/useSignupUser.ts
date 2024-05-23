import type { SignupSchema } from 'lib/schemas'
import type { UseFormReset } from 'react-hook-form'
import type { AuthResponse } from 'types'

import { toast } from 'sonner'

import { authService } from 'services'

import { useAppMutation } from './useAppMutation'

export const useSignupUser = (reset: UseFormReset<SignupSchema>) =>
  useAppMutation<SignupSchema, AuthResponse>({
    mutationKey: ['signup'],
    mutationFn: data => authService.signup(data),
    onSuccess(_, variables) {
      reset()
      toast.success(
        `Welcome aboard ${variables?.name}! You have successfully signed up. Let's get started.`
      )
    },
    onError(error) {
      toast.error(
        error.response?.status === 409
          ? 'Another user is already registered with the provided email address. Please use a different email.'
          : 'An error occurred during sign-up. Our technical team has been notified. Please try again shortly.'
      )
    }
  })
