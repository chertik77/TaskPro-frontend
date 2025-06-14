import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useQuery } from '@tanstack/react-query'

import { DragAndDropProvider } from '@/features/drag-and-drop'

import {
  BoardErrorView,
  boardQueries,
  WHITE_TEXT_BOARD_BG_IDS
} from '@/entities/board'

import { useDocumentTitle, useGetParamBoardId } from '@/shared/hooks'
import { cn } from '@/shared/lib'
import { Loader } from '@/shared/ui'

import { ColumnList } from '../column/ColumnList'
import { KanbanDragOverlay } from '../dnd/KanbanDragOverlay'
import { Filters } from '../filters/Filters'

export const Board = () => {
  const boardId = useGetParamBoardId()

  const {
    data: board,
    isPending,
    isError
  } = useQuery({
    ...boardQueries.board(boardId),
    retry: 1
  })

  useDocumentTitle(board?.title as string)

  if (isPending)
    return (
      <div className='flex h-full items-center justify-center'>
        <Loader />
      </div>
    )

  if (isError) return <BoardErrorView />

  const backgroundURL = board.background.url

  return (
    <ScrollArea.Root
      className='tablet:pt-[26px] desktop:pt-2.5 flex flex-col overflow-hidden bg-cover bg-center
        pt-3.5'
      style={{
        backgroundImage: backgroundURL ? `url(${backgroundURL})` : undefined
      }}>
      <div
        className={cn(
          `tablet:mb-[26px] desktop:mb-2.5 tablet:pl-8 desktop:pl-6 mb-[39px] flex
          justify-between gap-5 pl-5 text-black`,
          WHITE_TEXT_BOARD_BG_IDS.includes(board.background.identifier) &&
            'text-white',
          !backgroundURL && 'dark:text-white'
        )}>
        <h2 className='tablet:text-xl max-w-max truncate whitespace-pre'>
          {board.title}
        </h2>
        <Filters />
      </div>
      <ScrollArea.Viewport className='w-full flex-1 pb-4'>
        <DragAndDropProvider initialColumns={board.columns}>
          <ColumnList backgroundURL={backgroundURL} />
          <KanbanDragOverlay />
        </DragAndDropProvider>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className='tablet:mx-8 desktop:mx-6 mx-5 mb-2 h-3 bg-transparent'
        orientation='horizontal'>
        <ScrollArea.Thumb
          className={cn(
            '!h-3 rounded-[26px] bg-white/60',
            !backgroundURL &&
              'bg-gray-light violet:bg-black/20 dark:bg-white/10'
          )}
        />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}
