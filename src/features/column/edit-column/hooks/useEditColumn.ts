import type { Dispatch, SetStateAction } from 'react'

import { useMutation } from '@tanstack/react-query'

import { boardQueries } from '@/entities/board'

import { columnService } from '@/shared/api/column'

export const useEditColumn = (
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
) =>
  useMutation({
    mutationFn: columnService.editColumn,
    meta: {
      invalidates: [boardQueries.boardKey()],
      errorMessage:
        'An error occurred while editing the column. Please try again shortly.'
    },
    onSuccess: () => {
      setIsDialogOpen(false)
    }
  })
