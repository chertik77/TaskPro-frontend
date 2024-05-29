import type { Card } from 'types'

import { isToday } from 'date-fns'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { EditCardModal } from 'components/dashboard/modals'
import { Button } from 'components/ui'

import { useAppMutation } from 'hooks'

import { cardService } from 'services'

import { BoardCardColumnSelect } from './BoardCardColumnSelect'

export const BoardCardActions = ({ card }: { card: Card }) => {
  const { open } = useModal(EditCardModal)

  const { mutate } = useAppMutation({
    mutationKey: ['deleteCard'],
    mutationFn: () => cardService.deleteCard(card.id),
    onError() {
      toast.error(
        'An error occurred while deleting the task. Our technical team has been notified. Please try again shortly.'
      )
    }
  })

  return (
    <div className='ml-auto flex gap-2'>
      {isToday(card.deadline) && (
        <svg className='size-[19px] animate-bounce stroke-brand pr-1 violet:stroke-brand-secondary'>
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
