import { useMutation } from '@tanstack/react-query'

import { boardQueries } from '@/entities/board'

import { updateColumnMutation } from '@/shared/api'

export const useEditColumn = (closeDialog: () => void) =>
  useMutation({
    ...updateColumnMutation(),
    meta: {
      invalidates: [boardQueries.details()],
      errorMessage:
        'An error occurred while editing the column. Please try again.'
    },
    onSuccess: () => {
      closeDialog()
    }
  })
