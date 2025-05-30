import type { CardDtoTypes } from '@/shared/api/card'
import type { Dispatch, SetStateAction } from 'react'

import { useMutation } from '@tanstack/react-query'

import { boardQueries } from '@/entities/board'

import { cardService } from '@/shared/api/card'

export const useAddCard = (
  columnId: string,
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
) =>
  useMutation({
    mutationFn: (data: Omit<CardDtoTypes.AddCardDto, 'columnId'>) =>
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
