import type { BoardInitialState } from 'redux/slices/board/board-types'

import { handleSuccessToast } from 'lib/toasts'
import { useModal } from 'react-modal-state'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDeleteBoardMutation } from 'redux/api/dashboard/board'

export const SideBarBoardsItem = ({
  board,
  boards
}: {
  boards: BoardInitialState['board'][]
  board: BoardInitialState['board']
}) => {
  const { boardId } = useParams()
  const { open } = useModal('edit-board-modal')
  const navigate = useNavigate()
  const [deleteBoard] = useDeleteBoardMutation()

  const onEdit = () => {
    localStorage.setItem('edit-board-title', board.title)
    localStorage.setItem('edit-board-icon', board.icon)
    open()
  }

  const handleDelete = () => {
    deleteBoard(boardId)
      .unwrap()
      .then(() => {
        handleSuccessToast('Board has been deleted successfully!')
      })
    const index = boards.findIndex(board => board._id === boardId)

    const nextBoardIndex = index && boards.length - 1 ? 0 : 1
    navigate(`/dashboard/${boards[nextBoardIndex]?._id ?? ''}`, {
      replace: true
    })
  }

  return (
    <>
      <Link
        to={`/dashboard/${board._id}`}
        className='flex h-full items-center gap-2'>
        <svg className='size-[18px] stroke-current aria-[current=page]:bg-brand'>
          <use xlinkHref={`/assets/icons.svg#${board.icon}`}></use>
        </svg>
        <p className='w-[115px] truncate'>{board?.title}</p>
      </Link>
      {board._id === boardId && (
        <div className='flex items-center gap-2'>
          <button onClick={onEdit}>
            <svg
              className='size-4 stroke-black opacity-50 transition duration-300 ease-in-out
                aria-[current=page]:bg-brand hocus:stroke-brand violet:stroke-white-primary
                violet:hocus:stroke-white dark:stroke-white-primary dark:hocus:stroke-brand'>
              <use xlinkHref={`/assets/icons.svg#icon-pencil-btn`}></use>
            </svg>
          </button>
          <button onClick={handleDelete}>
            <svg
              className='size-4 stroke-black opacity-50 transition duration-300 ease-in-out
                aria-[current=page]:bg-brand hocus:stroke-brand violet:stroke-white-primary
                violet:hocus:stroke-white dark:stroke-white-primary dark:hocus:stroke-brand'>
              <use xlinkHref={`/assets/icons.svg#icon-trash-btn`}></use>
            </svg>
          </button>
          <div className='h-[61px] w-[4px] rounded-l-lg bg-brand violet:bg-white'></div>
        </div>
      )}
    </>
  )
}
