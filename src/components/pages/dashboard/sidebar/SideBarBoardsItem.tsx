import { handleSuccessToast } from 'lib/toasts'
import { useModal } from 'react-modal-state'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDeleteBoardMutation } from 'redux/api/dashboard/board'
import { BoardInitialState } from 'redux/slices/board/board-types'

export const SideBarBoardsItem = ({
  board,
  boards
}: {
  boards: BoardInitialState['board'][]
  board: BoardInitialState['board']
}) => {
  const { name } = useParams()
  const { open } = useModal('edit-board-modal')
  const navigate = useNavigate()
  const [deleteBoard] = useDeleteBoardMutation()

  const handleDelete = () => {
    deleteBoard(name)
      .unwrap()
      .then(() => {
        handleSuccessToast('Board has been deleted successfully!')
      })
    const index = boards.findIndex(board => board.title === name)

    const nextBoardIndex = index && boards.length - 1 ? 0 : 1
    navigate(`/dashboard/${boards[nextBoardIndex]?.title ?? ''}`, {
      replace: true
    })
  }

  return (
    <>
      <Link
        to={`/dashboard/${board.title}`}
        className='flex h-full items-center gap-2'>
        <svg className='size-[18px] stroke-current aria-[current=page]:bg-brand'>
          <use xlinkHref={`/assets/icons.svg#${board.icon}`}></use>
        </svg>
        <p className='w-[115px] truncate'>{board?.title}</p>
      </Link>
      {board.title === name && (
        <div className='flex items-center gap-2'>
          <button onClick={open}>
            <svg className='size-4 stroke-black opacity-50 transition duration-300 ease-in-out hocus:stroke-brand-hover violet:hocus:stroke-brand-secondary'>
              <use xlinkHref={`/assets/icons.svg#icon-pencil-btn`}></use>
            </svg>
          </button>
          <button onClick={handleDelete}>
            <svg className='size-4 stroke-black opacity-50 transition duration-300 ease-in-out hocus:stroke-brand-hover violet:hocus:stroke-brand-secondary'>
              <use xlinkHref={`/assets/icons.svg#icon-trash-btn`}></use>
            </svg>
          </button>
          <div className='h-[61px] w-[5px] rounded-l-lg bg-brand violet:bg-white'></div>
        </div>
      )}
    </>
  )
}
