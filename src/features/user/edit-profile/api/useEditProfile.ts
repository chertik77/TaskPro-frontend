import type { Dispatch, SetStateAction } from 'react'

import { useMutation } from '@tanstack/react-query'

import { userQueries, userService } from '@/entities/user'

export const useEditProfile = (
  setIsDialogOpen?: Dispatch<SetStateAction<boolean>>
) =>
  useMutation({
    mutationFn: userService.editUser,
    meta: {
      invalidates: [userQueries.current()],
      successMessage: 'Your profile has been successfully updated.',
      errorMessage: e =>
        e?.response?.status === 409
          ? 'An account with this email address already exists. Please use a different email.'
          : 'Failed to update profile. Please try again. If the problem persists, contact support.'
    },
    onSuccess() {
      setIsDialogOpen?.(false)
    }
  })
