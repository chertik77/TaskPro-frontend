import type { Card } from 'types'

import { isBefore, isToday } from 'date-fns'
import { useModal } from 'react-modal-state'
import { Tooltip } from 'react-tooltip'

import { EditCardModal } from 'components/dashboard/modals'
import { Button } from 'components/ui'

import { useAppMutation, useGetBoardId } from 'hooks'

import { cardService } from 'services'

import { BoardCardColumnSelect } from './BoardCardColumnSelect'

export const BoardCardActions = ({ card }: { card: Card }) => {
  const boardId = useGetBoardId()

  const isTodayDeadline = isToday(card.deadline)
  const isDeadlinePassed = isBefore(card.deadline, new Date())

  const { mutate } = useAppMutation({
    mutationKey: ['deleteCard'],
    mutationFn: () => cardService.deleteCard(boardId, card.column, card._id)
  })

  const { open } = useModal(EditCardModal)

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
      <Tooltip
        id='change-card-column-tooltip'
        delayShow={500}
      />
      <Button
        onClick={() => open(card)}
        iconName='pencil'
        data-tooltip-id='edit-card-tooltip'
        data-tooltip-content='Edit card'
      />
      <Button
        onClick={() => mutate()}
        iconName='trash'
        data-tooltip-id='delete-card-tooltip'
        data-tooltip-content='Delete card'
      />
      <Tooltip
        id='edit-card-tooltip'
        delayShow={500}
      />
      <Tooltip
        id='delete-card-tooltip'
        delayShow={500}
      />
    </div>
  )
}
