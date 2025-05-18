import type { CardDtoTypes } from '@/shared/api/card'
import type { Dispatch, SetStateAction } from 'react'
import type { UseFormReset } from 'react-hook-form'
import type { AddCardSchema } from '../add-card.contract'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { cardService } from '@/shared/api/card'

export const useAddCard = (
  reset: UseFormReset<AddCardSchema>,
  columnId: string,
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
) =>
  useMutation({
    mutationFn: (data: Omit<CardDtoTypes.AddCardDto, 'columnId'>) =>
      cardService.addCard({ columnId, ...data }),
    meta: { invalidates: [['board']] },
    onSuccess() {
      setIsDialogOpen(false)
      reset()
    },
    onError(e) {
      toast.error(
        'An error occurred while creating the task. Please try again shortly.'
      )
      console.error(e)
    }
  })
