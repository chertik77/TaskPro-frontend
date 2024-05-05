import { useGetBoardById } from 'hooks'

import { cn } from 'lib'

import { BoardAddColumnBtn } from './columns/BoardAddColumnBtn'
import { BoardColumnsList } from './columns/BoardColumnsList'
import { FilterSelect } from './filters/FilterSelect'

export const Board = () => {
  const { data } = useGetBoardById()

  return (
    <div
      className={cn(`space-y-[39px] overflow-x-auto px-5 pt-[14px] tablet:space-y-[26px]
        tablet:pl-[32px] desktop:space-y-[10px] desktop:pl-6`)}>
      <div className='flex justify-between'>
        <p className='text-fs-18-lh-normal-fw-500'>{data?.title}</p>
        <FilterSelect />
      </div>
      <div className='flex'>
        <BoardColumnsList columns={data?.columns} />
        <BoardAddColumnBtn />
      </div>
    </div>
  )
}
