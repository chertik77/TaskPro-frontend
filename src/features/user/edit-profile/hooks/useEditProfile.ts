import type { Dispatch, SetStateAction } from 'react'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { userService } from '@/shared/api/user'
import { useAuthStore } from '@/shared/store'

export const useEditProfile = (
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
) => {
  const { setUser } = useAuthStore()

  return useMutation({
    mutationFn: userService.editUser,
    onSuccess(data) {
      setIsDialogOpen(false)
      setUser(data)
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
