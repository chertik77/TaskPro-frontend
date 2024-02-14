import { format, parseISO } from 'date-fns'
import { useModal } from 'react-modal-state'
import { useParams } from 'react-router-dom'
import { useDeleteCardMutation } from 'redux/api/dashboard/card'
import type { Card } from 'redux/slices/board/board-types'
import { CardColumnSelect } from './CardColumnSelect'

type Priorities = 'Low' | 'Medium' | 'High' | 'Without priority'

const PriorityBorderColorPicker = (priority: Priorities) => {
  switch (priority) {
    case 'Low':
      return 'border-priority-low'
    case 'Medium':
      return 'border-priority-medium'
    case 'High':
      return 'border-brand'
    default:
      return 'border-black/30 dark:border-white/30'
  }
}

const PriorityColorPicker = (priority: Priorities) => {
  switch (priority) {
    case 'Low':
      return 'bg-priority-low'
    case 'Medium':
      return 'bg-priority-medium'
    case 'High':
      return 'bg-brand'
    default:
      return 'bg-black/30 dark:bg-white/30'
  }
}

export const BoardCardsItem = ({ card }: { card: Card }) => {
  const { boardId } = useParams()
  const [deleteCard] = useDeleteCardMutation()
  const { open } = useModal('edit-card-modal')
  const onEdit = () => {
    localStorage.setItem('card-values', JSON.stringify(card))
    open()
    localStorage.setItem(
      'ids',
      JSON.stringify({ columnId: card.column, cardId: card._id })
    )
  }

  const date = parseISO(card.deadline)

  return (
    <div
      className={`mb-[8px] h-[154px] w-[334px] rounded-[8px] border-l-[4px] ${PriorityBorderColorPicker(card.priority)} bg-white py-[14px] pl-[24px] pr-[20px] dark:bg-black`}>
      <p className='pb-[8px] text-fs-14-lh-normal-fw-600 dark:text-white'>
        {card.title}
      </p>
      <p className='mb-[14px] line-clamp-2 min-h-[38px] text-fs-12-lh-normal-fw-400 text-black/70 dark:text-white/50'>
        {card.description}
      </p>
      <div className='flex items-end border-t-[1px] border-black/10 pt-[14px] dark:border-white/10'>
        <div className='pr-[14px]'>
          <p className='pb-[4px] text-fs-8-lh-normal-fw-400 text-black/50 dark:text-white/50'>
            Priority
          </p>
          <div className='flex items-center gap-[4px]'>
            <div
              className={`size-[12px]  rounded-[50%] ${PriorityColorPicker(card.priority)}`}></div>
            <p className='text-fs-10-lh-normal-fw-400'>
              {card.priority === 'Without priority' ? 'Without' : card.priority}
            </p>
          </div>
        </div>
        <div>
          <p className='pb-[4px] text-fs-8-lh-normal-fw-400 text-black/50 dark:text-white/50'>
            Deadline
          </p>
          <p className='text-fs-10-lh-normal-fw-400'>
            {format(date, 'MM/dd/yyyy')}
          </p>
        </div>
        <div className='ml-auto flex gap-[8px]'>
          <svg className='size-[19px] stroke-brand pr-[4px]'>
            <use xlinkHref='/assets/icons.svg#icon-bell'></use>
          </svg>
          <CardColumnSelect card={card} />
          <button onClick={onEdit}>
            <svg className='size-[16px] stroke-black/50 transition duration-300 ease-in-out hocus:stroke-black dark:stroke-white/50 dark:hocus:stroke-white'>
              <use xlinkHref='/assets/icons.svg#icon-pencil-btn'></use>
            </svg>
          </button>
          <button
            onClick={() =>
              deleteCard({
                boardId,
                columnId: card.column,
                cardId: card._id
              })
            }>
            <svg className='size-[16px] stroke-black/50 transition duration-300 ease-in-out hocus:stroke-black dark:stroke-white/50 dark:hocus:stroke-white'>
              <use xlinkHref='/assets/icons.svg#icon-trash-btn'></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
