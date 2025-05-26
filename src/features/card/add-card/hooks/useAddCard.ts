import type { CardDtoTypes } from '@/shared/api/card'
import type { Dispatch, SetStateAction } from 'react'
import type { UseFormReset } from 'react-hook-form'
import type { AddCardSchema } from '../add-card.contract'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { boardQueries } from '@/entities/board'

import { cardService } from '@/shared/api/card'

export const useAddCard = (
  reset: UseFormReset<AddCardSchema>,
  columnId: string,
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
) =>
  useMutation({
    mutationFn: (data: Omit<CardDtoTypes.AddCardDto, 'columnId'>) =>
      cardService.addCard({ columnId, ...data }),
    meta: { invalidates: [boardQueries.boardKey()] },
    onSuccess() {
      setIsDialogOpen(false)
      reset()
    },
    onError() {
      toast.error(
        'An error occurred while creating the task. Please try again shortly.'
      )
    }
  })
