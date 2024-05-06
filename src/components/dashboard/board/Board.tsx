import type { OnDragEndResponder } from '@hello-pangea/dnd'

import { DragDropContext } from '@hello-pangea/dnd'

import { useAppMutation, useGetBoardById, useGetBoardId } from 'hooks'

import { cardService } from 'services'

import { cn } from 'lib'

import { BoardAddColumnBtn } from './columns/BoardAddColumnBtn'
import { BoardColumnsList } from './columns/BoardColumnsList'
import { FilterSelect } from './filters/FilterSelect'

type ChangeCardColumnMutation = {
  columnId: string
  cardId: string
  newColumnId: string
}

export const Board = () => {
  const boardId = useGetBoardId()
  const { data } = useGetBoardById()

  const { mutate } = useAppMutation<ChangeCardColumnMutation>({
    mutationKey: ['changeCardColumn'],
    mutationFn: ({ columnId, cardId, newColumnId }) =>
      cardService.changeCardColumn(boardId, columnId, cardId, newColumnId)
  })

  const onDragEnd: OnDragEndResponder = result => {
    if (!result.destination) return

    if (result.source.droppableId === result.destination.droppableId) return

    mutate({
      columnId: result.source.droppableId,
      cardId: result.draggableId,
      newColumnId: result.destination?.droppableId as string
    })
  }

  return (
    <div
      className={cn(`space-y-[39px] overflow-x-auto px-5 pt-[14px] tablet:space-y-[26px]
        tablet:pl-[32px] desktop:space-y-[10px] desktop:pl-6`)}>
      <div className='flex justify-between'>
        <p className='text-fs-18-lh-normal-fw-500'>{data?.title}</p>
        <FilterSelect />
      </div>
      <div className='flex'>
        <DragDropContext onDragEnd={onDragEnd}>
          <BoardColumnsList columns={data?.columns} />
        </DragDropContext>
        <BoardAddColumnBtn />
      </div>
    </div>
  )
}
