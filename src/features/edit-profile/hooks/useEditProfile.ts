import { useMutation } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { userService } from '@/shared/api/user'
import { useAuthStore } from '@/shared/store'

import { EditProfileModal } from '../components'

export const useEditProfile = () => {
  const updateUser = useAuthStore(state => state.updateUser)

  const { close: closeEditProfileModal } = useModal(EditProfileModal)

  return useMutation({
    mutationKey: ['editUserProfile'],
    mutationFn: userService.updateUserCredentials,
    onSuccess(data) {
      updateUser(data)
      closeEditProfileModal()
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
