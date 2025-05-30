import type { Dispatch, SetStateAction } from 'react'

import { useMutation } from '@tanstack/react-query'

import { boardQueries } from '@/entities/board'

import { cardService } from '@/shared/api/card'

export const useEditCard = (
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
) =>
  useMutation({
    mutationFn: cardService.editCard,
    meta: {
      invalidates: [boardQueries.boardKey()],
      errorMessage:
        'An error occurred while editing the task. Please try again shortly.'
    },
    onSuccess: () => {
      setIsDialogOpen(false)
    }
  })
