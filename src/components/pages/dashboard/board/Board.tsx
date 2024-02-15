import { Button } from 'components/ui'
import { useAppDispatch } from 'hooks'
import { useEffect, useState } from 'react'
import { useModal } from 'react-modal-state'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { boardApi } from 'redux/api/dashboard/board'
import { selectBoard, selectColumns } from 'redux/slices/board/board-slice'
import type { BoardInitialState } from 'redux/slices/board/board-types'
import { FilterSelect } from '../filters/FilterSelect'
import { BoardHeadingList } from './heading/BoardHeadingList'

const widthScreen = window.innerWidth

export const Board = () => {
  const { boardId } = useParams()
  const dispatch = useAppDispatch()
  const columns = useSelector(selectColumns)
  const { title } = useSelector(selectBoard)
  const { open } = useModal('add-column-modal')
  const [boardData, setBoardData] = useState<BoardInitialState['board'] | null>(
    null
  )
  let photo1x = ''
  let photo2x = ''
  if (widthScreen < 768) {
    photo1x = `${boardData?.background?.split(',')[0]}`
    photo2x = `${boardData?.background?.split(',')[1]}`
  } else if (widthScreen > 768 && widthScreen < 1440) {
    photo1x = `${boardData?.background?.split(',')[2]}`
    photo2x = `${boardData?.background?.split(',')[3]}`
  } else if (widthScreen > 1440) {
    photo1x = `${boardData?.background?.split(',')[4]}`
    photo2x = `${boardData?.background?.split(',')[5]}`
  }

  useEffect(() => {
    if (boardId) {
      dispatch(
        boardApi.endpoints.getBoardById.initiate(boardId, {
          forceRefetch: true
        })
      )
        .unwrap()
        .then(r => setBoardData(r))
    }
  }, [boardId])

  return (
    <>
      {boardData !== null && (
        <div
          className='relative col-start-2 row-start-2 flex flex-col gap-[39px] overflow-x-auto px-[20px] pt-[14px] text-fs-14-lh-normal-fw-500 text-black dark:text-white tablet:gap-[26px] tablet:pl-[32px] tablet:pt-[26px] tablet:text-fs-18-lh-normal-fw-500  desktop:gap-[10px] desktop:pl-[24px] desktop:pt-[10px]'
          style={{
            height: '100vh',
            backgroundImage: `image-set(url(${photo1x}) 1x,url(${photo2x}) 2x)`,
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
          {title}
          <FilterSelect />
          <div className='flex h-screen overflow-x-auto scrollbar scrollbar-track-white scrollbar-thumb-scroll-track1 violet:scrollbar-thumb-brand-third dark:scrollbar-track-black dark:scrollbar-thumb-scroll-thumb'>
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
