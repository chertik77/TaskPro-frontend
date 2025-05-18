import type { BoardTypes } from '@/entities/board'
import type { Dispatch, SetStateAction } from 'react'
import type { UseFormReset } from 'react-hook-form'
import type { EditColumnSchema } from '../edit-column.contract'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { columnService } from '@/shared/api/column'
import { useGetParamBoardId } from '@/shared/hooks'

export const useEditColumn = (
  reset: UseFormReset<EditColumnSchema>,
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient()

  const { boardId } = useGetParamBoardId()

  return useMutation({
    mutationFn: columnService.editColumn,
    onMutate: async ({ columnId, title }) => {
      await queryClient.cancelQueries({
        queryKey: ['board', boardId]
      })

      setIsDialogOpen(false)
      reset()

      const previousBoard = queryClient.getQueryData<BoardTypes.BoardSchema>([
        'board',
        boardId
      ])

      queryClient.setQueryData<BoardTypes.BoardSchema>(
        ['board', boardId],
        oldBoard =>
          oldBoard && {
            ...oldBoard,
            columns:
              oldBoard.columns &&
              oldBoard.columns.map(column =>
                column.id === columnId
                  ? { ...column, title: title || column.title }
                  : column
              )
          }
      )

      return { previousBoard }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['board', boardId], context?.previousBoard)
      toast.error(
        'An error occurred while editing the column. Please try again shortly.'
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['board', boardId]
      })
    }
  })
}
