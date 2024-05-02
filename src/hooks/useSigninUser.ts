import type { AxiosError } from 'axios'
import type { SigninSchemaFields } from 'lib/schemas'
import type { UseFormReset } from 'react-hook-form'

import { useMutation } from '@tanstack/react-query'
import { handleErrorToast, handleSuccessToast } from 'lib/toasts'
import { authService } from 'services/auth.service'

export const useSigninUser = (reset: UseFormReset<SigninSchemaFields>) =>
  useMutation({
    mutationKey: ['signin'],
    mutationFn: (data: SigninSchemaFields) => authService.signin(data),
    onSuccess(data) {
      reset()
      handleSuccessToast(
        `Welcome back, ${data.user.name}! We're glad to see you again.`
      )
    },
    onError(error) {
      const axiosError = error as AxiosError

      handleErrorToast(
        axiosError.response?.status === 401
          ? 'Invalid email or password. Please try again.'
          : 'Oops! Something went wrong during sign-in. Please check your details and try again.'
      )
    }
  })