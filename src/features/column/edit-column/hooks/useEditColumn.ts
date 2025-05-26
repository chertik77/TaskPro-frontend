import type { Dispatch, SetStateAction } from 'react'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { boardQueries } from '@/entities/board'

import { columnService } from '@/shared/api/column'

export const useEditColumn = (
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
) =>
  useMutation({
    mutationFn: columnService.editColumn,
    meta: { invalidates: [boardQueries.boardKey()] },
    onSuccess: () => {
      setIsDialogOpen(false)
    },
    onError: () => {
      toast.error(
        'An error occurred while editing the column. Please try again shortly.'
      )
    }
  })
