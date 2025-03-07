import { useMutation } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { userService } from '@/entities/user'

import { EditProfileModal } from '../components/EditProfileModal'

export const useEditProfile = () => {
  const { close: closeEditProfileModal } = useModal(EditProfileModal)

  return useMutation({
    mutationKey: ['editUserProfile'],
    mutationFn: userService.updateUserCredentials,
    meta: { invalidates: [['user']] },
    onSuccess() {
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
