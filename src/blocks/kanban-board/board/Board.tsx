import * as ScrollArea from '@radix-ui/react-scroll-area'

import { useGetBoardById } from '@/features/board/get-board-by-id'

import { DragAndDropProvider } from '@/entities/dnd'

import { useDocumentTitle } from '@/shared/hooks'
import { cn } from '@/shared/lib/cn'
import { Loader } from '@/shared/ui'

import { ColumnList } from '../column/ColumnList'
import { KanbanDragOverlay } from '../dnd/KanbanDragOverlay'
import { Filters } from '../filters/Filters'

export const Board = () => {
  const { data: board, isPending } = useGetBoardById()

  useDocumentTitle(board?.title as string)

  return (
    <ScrollArea.Root
      className='relative flex flex-col overflow-hidden bg-cover bg-center pl-5 pt-3.5
        tablet:pl-8 tablet:pt-[26px] desktop:pl-6 desktop:pt-2.5'
      style={{
        backgroundImage: `url(${!isPending && board?.background?.url})`
      }}>
      <div
        className={cn(
          'mb-[39px] flex justify-between text-black tablet:mb-[26px] desktop:mb-2.5',
          board?.background.hasWhiteTextColor && 'text-white',
          board?.background.identifier === 'default' && 'dark:text-white'
        )}>
        <h2 className='whitespace-pre tablet:text-xl'>{board?.title}</h2>
        {!isPending && <Filters />}
      </div>
      {isPending ? (
        <Loader className='absolute inset-0 m-auto' />
      ) : (
        <ScrollArea.Viewport className='w-full flex-1 pb-4'>
          <DragAndDropProvider initialColumns={board?.columns}>
            <ColumnList backgroundIdentifier={board?.background.identifier} />
            <KanbanDragOverlay />
          </DragAndDropProvider>
        </ScrollArea.Viewport>
      )}
      <ScrollArea.Scrollbar
        className='mx-5 mb-2 h-3 bg-transparent tablet:mx-8 desktop:mx-6'
        orientation='horizontal'>
        <ScrollArea.Thumb
          className={cn(
            '!h-3 rounded-[26px] bg-white/60',
            board?.background.identifier === 'default' &&
              'bg-gray-light violet:bg-black/20 dark:bg-white/10'
          )}
        />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}
