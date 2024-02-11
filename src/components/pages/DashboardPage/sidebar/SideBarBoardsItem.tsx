import { useModal } from 'react-modal-state'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useDeleteBoardMutation } from 'redux/api/dashboard/board'
import { BoardInitialState } from 'redux/slices/board/board-types'
import { selectBoards } from 'redux/slices/boards/boards-slice'

export const SideBarBoardsItem = ({
  board
}: {
  board: BoardInitialState['board']
}) => {
  const { name } = useParams()
  const { open } = useModal('edit-board-modal')
  const navigate = useNavigate()
  const boards = useSelector(selectBoards)
  const [deleteBoard] = useDeleteBoardMutation()

  const handleDelete = () => {
    deleteBoard(name)
    const index = boards.findIndex(board => board.title === name)

    if (!boards.length) {
      navigate('/dashboard', { replace: true })
    } else {
      const nextBoardIndex = index && boards.length - 1 ? 0 : 1
      navigate(`/dashboard/${boards[nextBoardIndex].title}`, {
        replace: true
      })
    }
  }

  return (
    <>
      <NavLink
        to={`/dashboard/${board.title}`}
        className='flex w-full items-center gap-2'>
        <svg className='size-[18px] stroke-current aria-[current=page]:bg-brand'>
          <use xlinkHref={`/assets/icons.svg#${board.icon}`}></use>
        </svg>
        <p className='w-[115px] truncate'>{board?.title}</p>
      </NavLink>
      {board.title === name && (
        <div className='flex items-center gap-2 '>
          <button onClick={open}>
            <svg className='size-4 opacity-50 aria-[current=page]:bg-brand hocus:text-brand-hover violet:hocus:text-brand-secondary'>
              <use xlinkHref={`/assets/icons.svg#icon-pencil-btn`}></use>
            </svg>
          </button>
          <button onClick={handleDelete}>
            <svg className='size-4 opacity-50 aria-[current=page]:bg-brand hocus:text-brand-hover violet:hocus:text-brand-secondary'>
              <use xlinkHref={`/assets/icons.svg#icon-trash-btn`}></use>
            </svg>
          </button>
          <div className='h-[61px] w-[5px] rounded-l-lg bg-brand violet:bg-white'></div>
        </div>
      )}
    </>
  )
}
