import { useMutation } from '@tanstack/react-query'

import { sessionQueries } from '@/entities/user'

import { deleteAvatarMutation } from '@/shared/api'

export const useDeleteAvatar = () =>
  useMutation({
    ...deleteAvatarMutation(),
    meta: {
      invalidates: [sessionQueries.currents()],
      successMessage: 'Your avatar has been removed.',
      errorMessage: 'We couldn’t remove your avatar. Please try again.'
    }
  })
