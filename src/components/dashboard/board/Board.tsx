import * as ScrollArea from '@radix-ui/react-scroll-area'

import { CustomScrollbar, Loader } from 'components/ui'

import { useGetBoardById } from 'hooks'

import { cn } from 'lib'

import { BoardAddColumnBtn } from './columns/BoardAddColumnBtn'
import { BoardColumnsList } from './columns/BoardColumnsList'
import { Filters } from './filters/Filters'

export const Board = () => {
  const { data, isPending } = useGetBoardById()

  return (
    <ScrollArea.Root
      type='scroll'
      className='relative flex flex-col overflow-hidden bg-cover bg-center px-5 pt-3.5
        tablet:px-8 tablet:pt-xl desktop:px-6 desktop:pt-sm'
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
      <ScrollArea.Viewport className='w-full flex-1 pb-4'>
        {isPending ? (
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
            <Loader />
          </div>
        ) : (
          <div className='flex'>
            <BoardColumnsList
              columns={data?.columns}
              backgroundIdentifier={data?.background.identifier}
            />
            <BoardAddColumnBtn />
          </div>
        )}
      </ScrollArea.Viewport>
      <CustomScrollbar
        scrollBarClassName='mx-5 mb-2 h-3 tablet:mx-8 desktop:mx-6'
        thumbClassName='!h-3'
        backgroundIdentifier={data?.background.identifier}
        orientation='horizontal'
      />
    </ScrollArea.Root>
  )
}
