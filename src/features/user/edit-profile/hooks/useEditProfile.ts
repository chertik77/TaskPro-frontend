import type { Dispatch, SetStateAction } from 'react'

import { useMutation } from '@tanstack/react-query'

import { userService } from '@/shared/api/user'
import { useAuthStore } from '@/shared/store'

export const useEditProfile = (
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
) => {
  const { setUser } = useAuthStore()

  return useMutation({
    mutationFn: userService.editUser,
    meta: {
      successMessage: 'Your profile has been successfully updated.',
      errorMessage: e =>
        e?.response?.status === 409
          ? 'An account with this email address already exists. Please use a different email.'
          : 'Failed to update profile. Please try again. If the problem persists, contact support.'
    },
    onSuccess(data) {
      setIsDialogOpen(false)
      setUser(data)
    }
  })
}
