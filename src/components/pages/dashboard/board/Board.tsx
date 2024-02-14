import { Button } from 'components/ui'
import { useAppDispatch } from 'hooks'
import { useEffect, useState } from 'react'
import { useModal } from 'react-modal-state'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { boardApi } from 'redux/api/dashboard/board'
import { selectColumns } from 'redux/slices/board/board-slice'
import type { BoardInitialState } from 'redux/slices/board/board-types'
import { BoardHeadingList } from './heading/BoardHeadingList'
import { FilterSelect } from '../filters/FilterSelect'

export const Board = () => {
  const { name } = useParams()
  const dispatch = useAppDispatch()
  const columns = useSelector(selectColumns)
  const { open } = useModal('add-column-modal')
  const [boardData, setBoardData] = useState<BoardInitialState['board'] | null>(
    null
  )

  useEffect(() => {
    if (name) {
      dispatch(
        boardApi.endpoints.getBoardByName.initiate(name, { forceRefetch: true })
      )
        .unwrap()
        .then(r => setBoardData(r))
    }
  }, [name, columns?.length])

  return (
    <>
      {boardData !== null && (
        <div className='col-start-2 row-start-2 flex flex-col gap-[39px] overflow-x-auto px-[20px] pt-[14px] text-fs-14-lh-normal-fw-500 text-black dark:text-white tablet:gap-[26px] tablet:pl-[32px] tablet:pt-[26px] tablet:text-fs-18-lh-normal-fw-500  desktop:gap-[10px] desktop:pl-[24px] desktop:pt-[10px]'>
          {boardData?.title}
          <FilterSelect />
          <div className='scrollbar scrollbar-track-white scrollbar-thumb-scroll-track1 violet:scrollbar-thumb-brand-third dark:scrollbar-track-black  dark:scrollbar-thumb-scroll-thumb flex h-screen overflow-x-auto'>
            <BoardHeadingList />
            <Button
              onClick={open}
              className='mb-[14px] mt-[39px] inline-flex h-[56px] w-[100%] items-center justify-center gap-2 rounded-md bg-white py-[14px] text-fs-14-lh-normal-fw-500 violet:bg-white violet:text-black dark:bg-black-secondary mobile:min-w-[335px] mobile:max-w-[335px] mobile:px-[79px] tablet:mt-[26px] tablet:min-w-[334px] tablet:max-w-[334px] tablet:pl-[79px] tablet:pr-[78px] desktop:mt-[10px]'>
              <svg className='size-7 rounded-md bg-black text-white violet:bg-brand-secondary violet:text-white dark:bg-white dark:text-black'>
                <use xlinkHref='/assets/icons.svg#icon-pluss' />
              </svg>
              {columns?.length > 0 ? (
                <span>Add another column</span>
              ) : (
                <span>Add column</span>
              )}
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
