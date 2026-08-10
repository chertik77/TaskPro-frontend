import type { Dispatch, SetStateAction } from 'react'

import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

import { boardQueries } from '@/entities/board'
import { labelQueries } from '@/entities/label'

import { updateLabelMutation } from '@/shared/api'

export const useEditLabel = (
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
) =>
  useMutation({
    ...updateLabelMutation(),
    meta: {
      invalidates: [
        labelQueries.lists(),
        boardQueries.lists(),
        boardQueries.details()
      ],
      errorMessage: e => {
        if (isAxiosError(e)) {
          return e.response?.status === 409
            ? 'A label with this name already exists.'
            : 'An error occurred while editing the label. Please try again.'
        }
      }
    },
    onSuccess() {
      setIsDialogOpen(false)
    }
  })
