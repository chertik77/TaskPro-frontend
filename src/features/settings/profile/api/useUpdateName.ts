import { useMutation } from '@tanstack/react-query'

import { sessionQueries } from '@/entities/user'

import { authClient } from '@/shared/api'

export const useUpdateName = (closeDialog: () => void) =>
  useMutation({
    mutationFn: (data: { name: string }) => authClient.updateUser(data),
    meta: {
      invalidates: [sessionQueries.currents()],
      errorMessage: 'We couldn’t update your name. Please try again.'
    },
    onSuccess() {
      closeDialog()
    }
  })
