import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useSuspenseQuery } from '@tanstack/react-query'

import { BoardColumnsList } from 'features/kanban/column/components'
import { DragAndDropProvider } from 'features/kanban/dnd/dnd.context'
import { Filters } from 'features/kanban/filters/components'

import { Scrollbar } from 'components/ui'
import { useDocumentTitle } from 'hooks'

import { cn } from 'lib'

import { boardQueryOptions } from '../boardQueryOptions'
import { useGetParamBoardId } from '../hooks'

export const Board = () => {
  const { boardId } = useGetParamBoardId()

  const {
    data: { title, background, columns }
  } = useSuspenseQuery(boardQueryOptions(boardId!))

  useDocumentTitle(title)

  return (
    <ScrollArea.Root
      className='relative flex flex-col overflow-hidden bg-cover bg-center pl-5 pt-3.5
        tablet:pl-8 tablet:pt-xl desktop:pl-6 desktop:pt-sm'
      style={{ backgroundImage: `url(${background?.url})` }}>
      <div
        className={cn(
          'mb-[39px] flex justify-between text-black tablet:mb-xl desktop:mb-sm',
          background.hasWhiteTextColor && 'text-white',
          background.identifier === 'default' && 'dark:text-white'
        )}>
        <p className='whitespace-pre tablet:text-lg'>{title}</p>
        <Filters />
      </div>
      <ScrollArea.Viewport className='w-full flex-1 pb-4'>
        <DragAndDropProvider initialColumns={columns}>
          <BoardColumnsList backgroundIdentifier={background.identifier} />
        </DragAndDropProvider>
      </ScrollArea.Viewport>
      <Scrollbar
        backgroundIdentifier={background.identifier}
        scrollBarClassName='mx-5 mb-2 h-3 tablet:mx-8 desktop:mx-6'
        thumbClassName='!h-3'
        orientation='horizontal'
      />
    </ScrollArea.Root>
  )
}
