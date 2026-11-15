import type { ChangePasswordSchema } from '../model/contract'

import { useMutation } from '@tanstack/react-query'

import { sessionQueries } from '@/entities/user'

import { authClient, authErrorMessage } from '@/shared/api'

export const useChangePassword = (closeDialog: () => void) =>
  useMutation({
    mutationFn: ({ currentPassword, newPassword }: ChangePasswordSchema) =>
      authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true
      }),
    meta: {
      invalidates: [sessionQueries.currents()],
      successMessage:
        'Your password has been updated. Other devices were signed out.',
      errorMessage: authErrorMessage(
        'We couldn’t update your password. Please try again.'
      )
    },
    onSuccess() {
      closeDialog()
    }
  })
