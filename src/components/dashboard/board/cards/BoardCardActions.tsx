import type { Card } from 'types'

import { isToday } from 'date-fns'
import { useModal } from 'react-modal-state'

import { EditCardModal } from 'components/dashboard/modals'
import { Button } from 'components/ui'

import { useDeleteCard } from 'hooks/card'

import { BoardCardColumnSelect } from './BoardCardColumnSelect'

export const BoardCardActions = ({ card }: { card: Card }) => {
  const { open } = useModal(EditCardModal)

  const { mutate } = useDeleteCard(card.id)

  return (
    <div className='ml-auto flex gap-2'>
      {isToday(card.deadline) && (
        <svg className='size-lg animate-bounce stroke-brand pr-1 violet:stroke-brand-secondary'>
          <use href='/icons.svg#icon-bell'></use>
        </svg>
      )}
      <BoardCardColumnSelect card={card} />
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
