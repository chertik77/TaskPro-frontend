import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useGetBoardById } from 'features/kanban/board/hooks'
import { BoardColumnsList } from 'features/kanban/column/components/BoardColumnsList'
import { DragAndDropProvider } from 'features/kanban/dnd/dnd.context'
import { Filters } from 'features/kanban/filters/components/Filters'

import { Loader, Scrollbar } from 'components/ui'

import { useDocumentTitle } from 'hooks'

import { cn } from 'lib'

export const Board = () => {
  const { data, isPending } = useGetBoardById()

  useDocumentTitle(data?.title as string)

  return (
    <ScrollArea.Root
      className='relative flex flex-col overflow-hidden bg-cover bg-center pl-5 pt-3.5
        tablet:pl-8 tablet:pt-xl desktop:pl-6 desktop:pt-sm'
      style={{
        backgroundImage: `url(${!isPending && data?.background?.url})`
      }}>
      <div
        className={cn(
          'mb-[39px] flex justify-between text-black tablet:mb-xl desktop:mb-sm',
          data?.background.hasWhiteTextColor && 'text-white',
          data?.background.identifier === 'default' && 'dark:text-white'
        )}>
        <p className='whitespace-pre tablet:text-lg'>{data?.title}</p>
        {!isPending && <Filters />}
      </div>
      {isPending ? (
        <Loader className='absolute inset-0 m-auto' />
      ) : (
        <ScrollArea.Viewport className='w-full flex-1 pb-4'>
          <DragAndDropProvider initialColumns={data?.columns}>
            <BoardColumnsList
              backgroundIdentifier={data?.background.identifier}
            />
          </DragAndDropProvider>
        </ScrollArea.Viewport>
      )}
      <Scrollbar
        backgroundIdentifier={data?.background.identifier}
        scrollBarClassName='mx-5 mb-2 h-3 tablet:mx-8 desktop:mx-6'
        thumbClassName='!h-3'
        orientation='horizontal'
      />
    </ScrollArea.Root>
  )
}
