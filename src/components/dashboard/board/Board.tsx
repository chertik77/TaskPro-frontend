import { useModal } from 'react-modal-state'
import { useParams } from 'react-router-dom'

import { Button } from 'components/ui'

import { useGetBoardById } from 'hooks/board/useGetBoardById'

import { cn } from 'lib'

import { FilterSelect } from '../filters/FilterSelect'
import { BoardColumnsList } from './columns/BoardColumnsList'

export const Board = () => {
  const { boardId } = useParams()

  const { open } = useModal('add-column-modal')

  const { data } = useGetBoardById(boardId!)

  // const queryClient = useQueryClient()

  // const { mutate } = useMutation({
  //   mutationKey: ['addColumn'],
  //   mutationFn: () =>
  //     columnService.addNewColumn(boardId!, { title: 'New Column' }),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['column'] })
  //   }
  // })

  return (
    <div
      className={cn(`relative col-start-2 row-start-2 flex flex-col gap-[39px] overflow-x-auto
        px-[20px] pt-[14px] tablet:gap-[26px] tablet:pl-[32px] tablet:pt-[26px]
        desktop:gap-[10px] desktop:pl-[24px] desktop:pt-[10px]`)}>
      <div className='mb-10 flex justify-between'>
        {data?.title}
        <FilterSelect />
      </div>
      <div className='flex'>
        <BoardColumnsList columns={data?.columns} />
        <Button
          onClick={open}
          className='flex h-[56px] min-w-[335px] max-w-[335px] items-center gap-2 rounded-md bg-white
            px-[79px] text-fs-14-lh-normal-fw-500 violet:bg-white violet:text-black
            dark:bg-black-secondary'>
          <svg
            className='size-7 rounded-md bg-black text-white violet:bg-brand-secondary
              violet:text-white dark:bg-white dark:text-black'>
            <use xlinkHref='/assets/icons.svg#icon-pluss' />
          </svg>
          Add another column
        </Button>
      </div>
    </div>
  )
}
