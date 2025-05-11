import type { CardTypes } from '@/entities/card'

import { useModal } from 'react-modal-state'

import { Card } from '@/entities/card'

import { Icon } from '@/shared/ui'

import { EditCardModal } from './EditCardModal'

export const EditCardModalTrigger = ({
  card
}: {
  card: CardTypes.CardSchema
}) => {
  const { open: openEditCardModal } = useModal(EditCardModal)

  const handleEditCardModal = () => {
    openEditCardModal<CardTypes.EditCardModalSchema>({
      id: card.id,
      title: card.title,
      description: card.description,
      priority: card.priority,
      deadline: card.deadline
    })
  }

  return (
    <Card.ActionButton
      onClick={handleEditCardModal}
      aria-label='Edit card'>
      <Icon name='pencil' />
    </Card.ActionButton>
  )
}
