import { useModal } from 'react-modal-state'
import { useParams } from 'react-router-dom'

import { Button } from 'components/ui'

import { useGetBoardById } from 'hooks/board/useGetBoardById'

import { cn } from 'lib'

import { FilterSelect } from '../filters/FilterSelect'
import { BoardHeadingList } from './heading/BoardHeadingList'

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
    <>
      {data !== null && (
        <div
          className={cn(
            `relative col-start-2 row-start-2 flex flex-col gap-[39px] overflow-x-auto
            px-[20px] pt-[14px] text-fs-14-lh-normal-fw-500 text-black dark:text-white
            tablet:gap-[26px] tablet:pl-[32px] tablet:pt-[26px]
            tablet:text-fs-18-lh-normal-fw-500 desktop:gap-[10px] desktop:pl-[24px]
            desktop:pt-[10px]`
          )}
          style={{
            // backgroundImage: `image-set(url('${photo1x}') 1x,url(${photo2x}) 2x)`,
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
          {data?.title}
          <FilterSelect />
          <div
            className='flex h-dvh overflow-x-auto scrollbar scrollbar-track-white
              scrollbar-thumb-scroll-track1 violet:scrollbar-thumb-brand-third
              dark:scrollbar-track-black dark:scrollbar-thumb-scroll-thumb'>
            <BoardHeadingList columns={data?.columns} />
            <Button
              onClick={open}
              className='mb-[14px] mt-[39px] inline-flex h-[56px] w-[100%] items-center justify-center
                gap-2 rounded-md bg-white py-[14px] text-fs-14-lh-normal-fw-500 violet:bg-white
                violet:text-black dark:bg-black-secondary mobile:min-w-[335px]
                mobile:max-w-[335px] mobile:px-[79px] tablet:mt-[26px] tablet:min-w-[334px]
                tablet:max-w-[334px] tablet:pl-[79px] tablet:pr-[78px] desktop:mt-[10px]'>
              <svg
                className='size-7 rounded-md bg-black text-white violet:bg-brand-secondary
                  violet:text-white dark:bg-white dark:text-black'>
                <use xlinkHref='/assets/icons.svg#icon-pluss' />
              </svg>
              <span>Add another column</span>
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
