import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { EditProfileModal } from 'components/dashboard/modals'

import { userService } from 'services'

export const useEditProfile = () => {
  const queryClient = useQueryClient()

  const { close } = useModal(EditProfileModal)

  return useMutation({
    mutationKey: ['editUser'],
    mutationFn: userService.updateUserCredentials,
    onSuccess() {
      close()
      toast.success('Your profile has been successfully updated.')
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError(e) {
      toast.error(
        e.response?.status === 409
          ? 'Profile update unsuccessful. Another user is already registered with the provided email address. Please use a different email.'
          : 'Failed to update profile. Please try again. If the problem persists, contact support.'
      )
    }
  })
}
