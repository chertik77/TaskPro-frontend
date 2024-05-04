import type { Card } from 'types/board.types'

import { isBefore, isToday } from 'date-fns'
import { useModal } from 'react-modal-state'

import { Button } from 'components/ui/Button'

import { useDeleteCard } from 'hooks/card/useDeleteCard'

import { CardColumnSelect } from './CardColumnSelect'

export const BoardCardActions = ({ card }: { card: Card }) => {
  const isTodayDeadline = isToday(card.deadline)
  const isDeadlinePassed = isBefore(card.deadline, new Date())

  const { mutate } = useDeleteCard(card.column, card._id)

  const { open } = useModal('edit-card-modal')

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
      <CardColumnSelect card={card} />
      <Button
        onClick={() => open(card)}
        iconName='pencil'
      />
      <Button
        onClick={() => mutate()}
        iconName='trash'
      />
    </div>
  )
}
