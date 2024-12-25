import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { EditProfileModal } from '../components/modals'
import { UserCacheKeys } from '../config'
import { userService } from '../user.service'

export const useEditProfile = () => {
  const queryClient = useQueryClient()

  const { close } = useModal(EditProfileModal)

  return useMutation({
    mutationKey: [UserCacheKeys.EditUserProfile],
    mutationFn: userService.updateUserCredentials,
    onSuccess() {
      close()
      toast.success('Your profile has been successfully updated.')
      queryClient.invalidateQueries({ queryKey: [UserCacheKeys.User] })
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
