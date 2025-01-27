import type { CardTypes } from '@/shared/api/card'

import { useDeleteCard } from '@/features/kanban/card/hooks'
import { Button, Icon } from '@/shared/components/ui'
import { isToday } from 'date-fns'
import { useModal } from 'react-modal-state'

import { EditCardModal } from './modals'

export const BoardCardActions = ({ card }: { card: CardTypes.Card }) => {
  const { open: openEditCardModal } = useModal(EditCardModal)

  const { mutate: deleteCard } = useDeleteCard()

  const handleEditCardModal = () => {
    openEditCardModal<CardTypes.EditCardModalProps>({
      id: card.id,
      title: card.title,
      description: card.description,
      priority: card.priority,
      deadline: new Date(card.deadline)
    })
  }

  return (
    <div className='ml-auto flex gap-2'>
      {isToday(card.deadline) && (
        <Icon
          name='bell'
          className='size-lg animate-bounce stroke-brand pr-1 violet:stroke-brand-secondary'
        />
      )}
      <Button
        onClick={handleEditCardModal}
        aria-label='Edit card'
        iconName='pencil'
      />
      <Button
        onClick={() => deleteCard(card.id)}
        aria-label='Delete card'
        iconName='trash'
      />
    </div>
  )
}
