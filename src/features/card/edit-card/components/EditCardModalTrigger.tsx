import type { CardTypes } from '@/entities/card'

import { useModal } from 'react-modal-state'

import { Button } from '@/shared/components'

import { EditCardModal } from './EditCardModal'

export const EditCardModalTrigger = ({ card }: { card: CardTypes.Card }) => {
  const { open: openEditCardModal } = useModal(EditCardModal)

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
    <Button
      onClick={handleEditCardModal}
      aria-label='Edit card'
      iconName='pencil'
    />
  )
}
