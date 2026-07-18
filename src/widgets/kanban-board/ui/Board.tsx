import { ScrollArea } from '@base-ui/react/scroll-area'
import { useQuery } from '@tanstack/react-query'

import { DragAndDropProvider } from '@/features/drag-and-drop'

import {
  BoardErrorView,
  useGetParamBoardId,
  WHITE_TEXT_BOARD_BG_IDS
} from '@/entities/board'
import { useSettings } from '@/entities/setting'

import { getBoardByIdOptions } from '@/shared/api'
import { cn, useDocumentTitle } from '@/shared/lib'
import { Loader } from '@/shared/ui'

import { ColumnList } from './column-list/ColumnList'
import { KanbanDragOverlay } from './dnd/KanbanDragOverlay'
import { Filters } from './filters/Filters'

export const Board = () => {
  const boardId = useGetParamBoardId()

  const {
    data: board,
    isPending,
    isError,
    error
  } = useQuery({
    ...getBoardByIdOptions({ path: { boardId } }),
    retry: 1
  })

  const backgroundBlur = useSettings(
    select => select.general?.boardBackgroundBlur
  )

  useDocumentTitle(board?.title as string)

  if (isPending)
    return (
      <div className='flex h-full items-center justify-center'>
        <Loader />
      </div>
    )

  if (isError) return <BoardErrorView error={error} />

  const backgroundURL = board.background.url

  return (
    <ScrollArea.Root
      className='tablet:pt-6.5 desktop:pt-2.5 flex flex-col overflow-hidden
        pt-3.5'>
      <div
        className={cn('absolute inset-0 -z-10 scale-110 bg-cover bg-center', [
          {
            'blur-sm': backgroundBlur === 'low',
            'blur-md': backgroundBlur === 'medium'
          }
        ])}
        style={{
          backgroundImage: backgroundURL ? `url(${backgroundURL})` : undefined
        }}
      />
      <div
        className={cn(
          `tablet:mb-6.5 desktop:mb-2.5 tablet:pl-8 desktop:pl-6 mb-10 flex
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
      <ScrollArea.Viewport>
        <ScrollArea.Content className='w-full flex-1 pb-4'>
          <DragAndDropProvider initialColumns={board.columns}>
            <ColumnList backgroundURL={backgroundURL} />
            <KanbanDragOverlay />
          </DragAndDropProvider>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className='tablet:mx-8 desktop:mx-6 mx-5 mb-2 h-3 bg-transparent'
        orientation='horizontal'>
        <ScrollArea.Thumb
          className={cn(
            'h-3! rounded-[26px] bg-white/60',
            !backgroundURL && 'bg-gray-light dark:bg-white/10'
          )}
        />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}
