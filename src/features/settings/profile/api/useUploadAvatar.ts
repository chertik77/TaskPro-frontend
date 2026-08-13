import { useMutation } from '@tanstack/react-query'

import { sessionQueries } from '@/entities/user'

import { uploadAvatarMutation } from '@/shared/api'

export const useUploadAvatar = (closeDialog: () => void) =>
  useMutation({
    ...uploadAvatarMutation({ requestValidator: undefined }),
    meta: {
      invalidates: [sessionQueries.currents()],
      successMessage: 'Your avatar has been updated.',
      errorMessage: 'We couldn’t update your avatar. Please try again.'
    },
    onSuccess() {
      closeDialog()
    }
  })
