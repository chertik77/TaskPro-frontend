import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useQuery } from '@tanstack/react-query'

import { DragAndDropProvider } from '@/features/drag-and-drop'

import { boardQueries, WHITE_TEXT_BOARD_BG_IDS } from '@/entities/board'

import { useDocumentTitle, useGetParamBoardId } from '@/shared/hooks'
import { cn } from '@/shared/lib/cn'
import { Loader } from '@/shared/ui'

import { ColumnList } from '../column/ColumnList'
import { KanbanDragOverlay } from '../dnd/KanbanDragOverlay'
import { Filters } from '../filters/Filters'

export const Board = () => {
  const boardId = useGetParamBoardId()

  const { data: board, isPending } = useQuery(boardQueries.board(boardId))

  useDocumentTitle(board?.title as string)

  return (
    <ScrollArea.Root
      className='tablet:pt-[26px] desktop:pt-2.5 relative flex flex-col overflow-hidden bg-cover
        bg-center pt-3.5'
      style={{
        backgroundImage:
          !isPending && board?.background.url
            ? `url(${board.background.url})`
            : undefined
      }}>
      <div
        className={cn(
          `tablet:mb-[26px] desktop:mb-2.5 tablet:pl-8 desktop:pl-6 mb-[39px] flex
          justify-between gap-5 pl-5 text-black`,
          WHITE_TEXT_BOARD_BG_IDS.includes(
            board?.background.identifier as string
          ) && 'text-white',
          !board?.background.url && 'dark:text-white'
        )}>
        <h2 className='tablet:text-xl max-w-max truncate whitespace-pre'>
          {board?.title}
        </h2>
        {!isPending && <Filters />}
      </div>
      {isPending ? (
        <Loader className='absolute inset-0 m-auto' />
      ) : (
        <ScrollArea.Viewport className='w-full flex-1 pb-4'>
          <DragAndDropProvider initialColumns={board?.columns}>
            <ColumnList backgroundURL={board?.background.url} />
            <KanbanDragOverlay />
          </DragAndDropProvider>
        </ScrollArea.Viewport>
      )}
      <ScrollArea.Scrollbar
        className='tablet:mx-8 desktop:mx-6 mx-5 mb-2 h-3 bg-transparent'
        orientation='horizontal'>
        <ScrollArea.Thumb
          className={cn(
            '!h-3 rounded-[26px] bg-white/60',
            !board?.background.url &&
              'bg-gray-light violet:bg-black/20 dark:bg-white/10'
          )}
        />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}
