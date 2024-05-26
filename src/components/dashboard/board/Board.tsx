import type { OnDragEndResponder } from '@hello-pangea/dnd'

import { DragDropContext } from '@hello-pangea/dnd'

import { Loader } from 'components/ui'

import { useAppMutation, useGetBoardById } from 'hooks'

import { cardService } from 'services'

import { cn } from 'lib'

import { BoardAddColumnBtn } from './columns/BoardAddColumnBtn'
import { BoardColumnsList } from './columns/BoardColumnsList'
import { Filters } from './filters/Filters'

type ChangeCardColumnMutation = {
  columnId: string
  cardId: string
  newColumnId: string
}

export const Board = () => {
  const { data, isPending } = useGetBoardById()

  const { mutate } = useAppMutation<ChangeCardColumnMutation>({
    mutationKey: ['changeCardColumn'],
    mutationFn: ({ columnId, cardId, newColumnId }) =>
      cardService.changeCardColumn(columnId, cardId, newColumnId)
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
    <>
      <div
        className='relative overflow-hidden bg-cover bg-center px-5 pt-default tablet:px-8
          tablet:pt-[26px] desktop:px-6 desktop:pt-[10px]'
        style={{
          backgroundImage: `url(${!isPending && data?.background?.url})`
        }}>
        <div
          className={cn(
            'mb-[39px] flex justify-between text-black tablet:mb-[26px] desktop:mb-[10px]',
            data?.background.hasWhiteTextColor && 'text-white',
            data?.background.identifier === 'default' && 'dark:text-white'
          )}>
          <p className='tablet:text-fs-18-lh-normal-fw-500'>{data?.title}</p>
          {!isPending && <Filters />}
        </div>
        <div
          className='flex h-full overflow-x-scroll pb-4 scrollbar scrollbar-track-white
            scrollbar-thumb-scroll-white scrollbar-track-rounded-xl
            scrollbar-thumb-rounded-xl scrollbar-h-3 violet:scrollbar-thumb-brand-third
            dark:scrollbar-track-black dark:scrollbar-thumb-white/10'>
          {isPending ? (
            <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
              <Loader />
            </div>
          ) : (
            <>
              <DragDropContext onDragEnd={onDragEnd}>
                <BoardColumnsList columns={data?.columns} />
              </DragDropContext>
              <BoardAddColumnBtn />
            </>
          )}
        </div>
      </div>
    </>
  )
}
