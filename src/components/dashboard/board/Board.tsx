import { useModal } from 'react-modal-state'
import { useParams } from 'react-router-dom'

import { Button } from 'components/ui'

import { useGetBoardById } from 'hooks/board/useGetBoardById'

import { cn } from 'lib'

import { BoardColumnsList } from './columns/BoardColumnsList'
import { FilterSelect } from './filters/FilterSelect'

export const Board = () => {
  const { boardId } = useParams()

  const { open } = useModal('add-column-modal')

  const { data } = useGetBoardById(boardId!)

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
        <Button
          onClick={open}
          className='flex h-[56px] min-w-[335px] max-w-[335px] items-center gap-2 bg-white px-[79px]
            violet:bg-white violet:text-black dark:bg-black-secondary dark:text-white'>
          <svg
            className='size-7 rounded-md bg-black text-white violet:bg-brand-secondary dark:bg-white
              dark:text-black'>
            <use href='/icons.svg#icon-plus-create' />
          </svg>
          Add another column
        </Button>
      </div>
    </div>
  )
}
