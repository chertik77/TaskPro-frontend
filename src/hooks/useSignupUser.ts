import type { SignupSchemaFields } from 'lib/schemas'
import type { UseFormReset } from 'react-hook-form'
import type { AuthResponse } from 'types'

import { toast } from 'sonner'

import { authService } from 'services'

import { useAppMutation } from './useAppMutation'

export const useSignupUser = (reset: UseFormReset<SignupSchemaFields>) =>
  useAppMutation<SignupSchemaFields, AuthResponse>({
    mutationKey: ['signup'],
    mutationFn: data => authService.signup(data),
    onSuccess(_, variables) {
      reset()
      toast.success(
        `Welcome, ${variables?.name}! Your account has been successfully created. Let's get started!`
      )
    },
    onError(error, variables) {
      toast.error(
        error.response?.status === 409
          ? `User with email - ${variables.email} already exists. Please try different email.`
          : 'Oops! Something went wrong during registration. Please check your details and try again.'
      )
    }
  })
