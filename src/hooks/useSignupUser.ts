import type { AxiosError } from 'axios'
import type { SignupSchemaFields } from 'lib/schemas'
import type { UseFormReset } from 'react-hook-form'

import { useMutation } from '@tanstack/react-query'
import { handleErrorToast, handleSuccessToast } from 'lib/toasts'
import { authService } from 'services/auth.service'

export const useSignupUser = (reset: UseFormReset<SignupSchemaFields>) =>
  useMutation({
    mutationKey: ['signup'],
    mutationFn: (data: SignupSchemaFields) => authService.signup(data),
    onSuccess(_, variables) {
      reset()
      handleSuccessToast(
        `Welcome, ${variables?.name}! Your account has been successfully created. Let's get started!`
      )
    },
    onError(error, variables) {
      const axiosError = error as AxiosError

      handleErrorToast(
        axiosError.response?.status === 409
          ? `User with email - ${variables.email} already exists. Please try different email.`
          : 'Oops! Something went wrong during registration. Please check your details and try again.'
      )
    }
  })
