import { useMutation } from '@tanstack/react-query'

import { boardQueries } from '@/entities/board'
import { labelQueries } from '@/entities/label'

import { updateLabelMutation } from '@/shared/api'
import { isHttpError } from '@/shared/lib'

export const useEditLabel = (closeDialog: () => void) =>
  useMutation({
    ...updateLabelMutation(),
    meta: {
      invalidates: [
        labelQueries.lists(),
        boardQueries.lists(),
        boardQueries.details()
      ],
      errorMessage: e => {
        if (isHttpError(e)) {
          return e?.status === 409
            ? 'A label with this name already exists.'
            : 'An error occurred while editing the label. Please try again.'
        }
      }
    },
    onSuccess() {
      closeDialog()
    }
  })
