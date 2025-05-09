import type { BoardTypes } from '@/entities/board'
import type { BoardDtoTypes } from '@/shared/api/board'
import type { UseFormReset } from 'react-hook-form'
import type { EditBoardSchema } from '../edit-board.contract'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { boardService } from '@/shared/api/board'
import { useGetParamBoardId } from '@/shared/hooks'

import { EditBoardModal } from '../components/EditBoardModal'

export const useEditBoard = (reset: UseFormReset<EditBoardSchema>) => {
  const queryClient = useQueryClient()

  const { boardId } = useGetParamBoardId()

  const { close: closeEditBoardModal } = useModal(EditBoardModal)

  return useMutation({
    mutationFn: (data: Omit<BoardDtoTypes.EditBoardDto, 'boardId'>) =>
      boardService.editBoard({ boardId: boardId!, ...data }),
    onMutate: async ({ title, icon }) => {
      await queryClient.cancelQueries({ queryKey: ['boards'] })

      closeEditBoardModal()
      reset()

      const previousBoards = queryClient.getQueryData<BoardTypes.BoardsSchema>([
        'boards'
      ])

      queryClient.setQueryData<BoardTypes.BoardsSchema>(
        ['boards'],
        oldBoards =>
          oldBoards &&
          oldBoards.map(b =>
            b.id === boardId
              ? { ...b, title: title || b.title, icon: icon || b.icon }
              : b
          )
      )

      return { previousBoards }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['boards'], context?.previousBoards)
      toast.error(
        'An error occurred while editing the board. Please try again shortly.'
      )
    },
    onSettled: data => {
      queryClient.invalidateQueries({ queryKey: ['boards'] })

      if (data?.id === boardId) {
        queryClient.invalidateQueries({ queryKey: ['board'] })
      }
    }
  })
}
