import { useModal } from 'react-modal-state'
import { useParams } from 'react-router-dom'
import { useDeleteColumnMutation } from 'redux/api/dashboard/column'
import type { Column } from 'redux/slices/board/board-types'
import { BoardCardsItem } from '../cards/BoardCardsItem'

export const BoardHeadingItem = ({ column }: { column: Column }) => {
  const { boardId } = useParams()
  const [deleteColumn] = useDeleteColumnMutation()
  const { open } = useModal('edit-column-modal')

  return (
    <>
      <div className='mb-[14px] mr-[34px] flex h-[56px] w-[100%] min-w-[285px] items-center rounded-[8px] bg-white px-[20px] pb-[17px] pt-[18px] dark:bg-black mobile:w-[335px] tablet:w-[334px]'>
        <div className='text-fs-14-lh-normal-fw-500 text-black dark:text-white'>
          {column.title}
        </div>
        <div className='ml-auto flex gap-[8px]'>
          <button
            onClick={() => {
              localStorage.setItem('columnId', column._id)
              localStorage.setItem('column-title', column.title)
              open()
            }}>
            <svg className='size-[16px] stroke-black/50 transition duration-300 ease-in-out hocus:stroke-black dark:stroke-white/50 dark:hocus:stroke-white'>
              <use xlinkHref='/assets/icons.svg#icon-pencil-btn'></use>
            </svg>
          </button>
          <button
            onClick={() => deleteColumn({ boardId, columnId: column._id })}>
            <svg className='size-[16px] stroke-black/50 transition duration-300 ease-in-out hocus:stroke-black dark:stroke-white/50 dark:hocus:stroke-white'>
              <use xlinkHref='/assets/icons.svg#icon-trash-btn'></use>
            </svg>
          </button>
        </div>
      </div>
      {column?.cards?.length > 0 && (
        <div className='mb-[14px]'>
          {column.cards.toReversed().map(card => (
            <BoardCardsItem key={card._id} card={card} />
          ))}
        </div>
      )}
    </>
  )
}
