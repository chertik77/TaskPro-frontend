import type { BoardSchema } from 'lib/schemas'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { boardService } from 'services'

export const useEditBoard = () => {
  const queryClient = useQueryClient()

  // const { close } = useModal(EditBoardModal)

  return useMutation({
    mutationKey: ['editBoard'],
    mutationFn: ({
      boardId,
      boardData
    }: {
      boardId: string
      boardData: BoardSchema
    }) => boardService.editBoard(boardId, boardData),
    // onMutate: async ({ boardId, boardData }) => {
    //   await queryClient.cancelQueries({ queryKey: ['boards'] })

    //   close()
    //   reset()

    //   const previousBoards = queryClient.getQueryData<Board[]>(['boards'])

    //   queryClient.setQueryData<Board[]>(
    //     ['boards'],
    //     oldBoards =>
    //       oldBoards &&
    //       oldBoards.map(b => (b.id === boardId ? { ...b, ...boardData } : b))
    //   )

    //   return { previousBoards }
    // },
    // onError: (_, __, context) => {
    //   queryClient.setQueryData(['boards'], context?.previousBoards),
    //     toast.error(
    //       'Failed to update the board. Please try again. If the problem persists, contact support.'
    //     )
    // },
    onSettled: (data, _, variables) => {
      queryClient.invalidateQueries({ queryKey: ['boards'] })

      if (data?.id === variables.boardId) {
        queryClient.invalidateQueries({ queryKey: ['board'] })
      }
    }
  })
}
