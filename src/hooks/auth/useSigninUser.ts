import type { SigninSchemaFields } from 'lib/schemas'
import type { UseFormReset } from 'react-hook-form'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { authService } from 'services/auth.service'

export const useSigninUser = (reset: UseFormReset<SigninSchemaFields>) =>
  useMutation({
    mutationKey: ['signin'],
    mutationFn: (data: SigninSchemaFields) => authService.signin(data),
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
