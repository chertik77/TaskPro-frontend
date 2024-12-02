import * as ScrollArea from '@radix-ui/react-scroll-area'

import { Loader, Scrollbar } from 'components/ui'

import { useAutomaticHorizontalWheelScroll, useGetBoardById } from 'hooks/board'
import { useDocumentTitle } from 'hooks/useDocumentTitle'

import { cn } from 'lib'

import { BoardColumnsList } from './columns/BoardColumnsList'
import { Filters } from './filters/Filters'

export const Board = () => {
  const { data, isPending } = useGetBoardById()

  const { viewportRef, onWheel } = useAutomaticHorizontalWheelScroll()

  useDocumentTitle(data?.title as string)

  return (
    <ScrollArea.Root
      onWheel={onWheel}
      type='scroll'
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
        <p className='tablet:text-lg'>{data?.title}</p>
        {!isPending && <Filters />}
      </div>
      <ScrollArea.Viewport
        className='w-full flex-1 pb-4'
        ref={viewportRef}>
        {isPending ? (
          <Loader className='absolute inset-0 m-auto' />
        ) : (
          <BoardColumnsList
            initialColumns={data?.columns}
            backgroundIdentifier={data?.background.identifier}
          />
        )}
      </ScrollArea.Viewport>
      <Scrollbar
        backgroundIdentifier={data?.background.identifier}
        scrollBarClassName='mx-5 mb-2 h-3 tablet:mx-8 desktop:mx-6'
        thumbClassName='!h-3'
        orientation='horizontal'
      />
    </ScrollArea.Root>
  )
}
