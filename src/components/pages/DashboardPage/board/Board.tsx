import { Button } from 'components/ui'
import { useAppDispatch } from 'hooks'
import { useEffect, useState } from 'react'
import { useModal } from 'react-modal-state'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { boardApi } from 'redux/api/dashboard/board'
import { selectColumns } from 'redux/slices/board/board-slice'
import { BoardInitialState } from 'redux/slices/board/board-types'
import { selectBoards } from 'redux/slices/boards/boards-slice'
import { BackgroundImage } from './BackgroundImage'

export const Board = () => {
  const { name } = useParams()
  const dispatch = useAppDispatch()
  const columns = useSelector(selectColumns)
  const boards = useSelector(selectBoards)
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
  }, [name, columns])

  return (
    boards.length > 0 && (
      <div className='col-start-2 row-start-2 pl-[20px] pt-[14px] text-fs-14-lh-normal-fw-500 text-black  dark:text-white'>
        {boardData?.title}
        <Button
          onClick={open}
          className='inline-flex h-[56px] w-[335px] items-center justify-center gap-2 rounded-md  bg-white fill-black px-[79px] py-[14px] text-fs-14-lh-normal-fw-500 dark:bg-black-secondary sm:w-[334px] sm:pl-[79px] sm:pr-[78px]'>
          <svg className='size-7 rounded-md bg-black text-white violet:bg-brand-secondary violet:text-white dark:bg-white dark:text-black'>
            <use xlinkHref='/assets/icons.svg#icon-plus' />
          </svg>
          Add another column
        </Button>
        {boardData?.columns.map(column => (
          <p key={column._id}>{column.title}</p>
        ))}
        {boardData?.background && <BackgroundImage id={boardData.background} />}
      </div>
    )
  )
}
