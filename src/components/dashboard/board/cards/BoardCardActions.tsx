import type { Card } from 'types'

import { isBefore, isToday } from 'date-fns'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { EditCardModal } from 'components/dashboard/modals'
import { Button } from 'components/ui'

import { useAppMutation, useGetBoardId } from 'hooks'

import { cardService } from 'services'

import { BoardCardColumnSelect } from './BoardCardColumnSelect'

export const BoardCardActions = ({ card }: { card: Card }) => {
  const boardId = useGetBoardId()

  const { open } = useModal(EditCardModal)

  const { mutateAsync } = useAppMutation({
    mutationKey: ['deleteCard'],
    mutationFn: () => cardService.deleteCard(boardId, card.column, card._id)
  })

  const handleCardDelete = () => {
    toast.promise(mutateAsync(), {
      loading: 'Deleting the task...',
      success: 'Task deleted successfully! One less thing to worry about.',
      error:
        'An error occurred while deleting the task. Our technical team has been notified. Please try again shortly.'
    })
  }

  const isTodayDeadline = isToday(card.deadline)
  const isDeadlinePassed = isBefore(card.deadline, new Date())

  return (
    <div className='ml-auto flex gap-2'>
      {isTodayDeadline && (
        <svg className='size-[19px] animate-bounce stroke-brand pr-1 violet:stroke-brand-secondary'>
          <use href='/icons.svg#icon-bell'></use>
        </svg>
      )}
      {isDeadlinePassed && !isTodayDeadline && (
        <svg className='size-[19px] animate-bounce stroke-red-500 pr-1'>
          <use href='/icons.svg#icon-bell'></use>
        </svg>
      )}
      <BoardCardColumnSelect card={card} />
      <Button
        onClick={() => open(card)}
        iconName='pencil'
      />
      <Button
        onClick={handleCardDelete}
        iconName='trash'
      />
    </div>
  )
}
