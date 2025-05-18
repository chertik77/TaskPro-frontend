import type { Dispatch, SetStateAction } from 'react'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { userService } from '@/shared/api/user'
import { useAuthStore } from '@/shared/store'

export const useEditProfile = (
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
) => {
  const updateUser = useAuthStore(state => state.updateUser)

  return useMutation({
    mutationFn: userService.updateUserCredentials,
    onSuccess(data) {
      setIsDialogOpen(false)
      updateUser(data)
      toast.success('Your profile has been successfully updated.')
    },
    onError(e) {
      toast.error(
        e.response?.status === 409
          ? 'An account with this email address already exists. Please use a different email.'
          : 'Failed to update profile. Please try again. If the problem persists, contact support.'
      )
    }
  })
}
