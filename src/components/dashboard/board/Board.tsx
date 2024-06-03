import { Loader } from 'components/ui'

import { useGetBoardById } from 'hooks'

import { cn } from 'lib'

import { BoardAddColumnBtn } from './columns/BoardAddColumnBtn'
import { BoardColumnsList } from './columns/BoardColumnsList'
import { Filters } from './filters/Filters'

export const Board = () => {
  const { data, isPending } = useGetBoardById()

  return (
    <>
      <div
        className='relative overflow-hidden bg-cover bg-center px-5 pt-3.5 tablet:px-8 tablet:pt-xl
          desktop:px-6 desktop:pt-sm'
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
        <div className='custom-scrollbar flex h-full overflow-x-scroll pb-4'>
          {isPending ? (
            <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
              <Loader />
            </div>
          ) : (
            <>
              <BoardColumnsList columns={data?.columns} />
              <BoardAddColumnBtn />
            </>
          )}
        </div>
      </div>
    </>
  )
}
