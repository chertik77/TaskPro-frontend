import type { Dispatch, SetStateAction } from 'react'
import type { AddCardSchema } from '../add-card.contract'

import { useMutation } from '@tanstack/react-query'

import { boardQueries } from '@/entities/board'

import { cardService } from '@/shared/api/card'

export const useAddCard = (
  columnId: string,
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
) =>
  useMutation({
    mutationFn: (data: AddCardSchema) =>
      cardService.addCard({ columnId, ...data }),
    meta: {
      invalidates: [boardQueries.boardKey()],
      errorMessage:
        'An error occurred while creating the task. Please try again shortly.'
    },
    onSuccess() {
      setIsDialogOpen(false)
    }
  })
