import type { CardTypes } from '@/entities/card'

import { useModal } from 'react-modal-state'

import { Icon } from '@/shared/ui'

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
    <button
      type='button'
      className='focus-visible:styled-outline hocus:[&_svg]:stroke-black
        violet:hocus:[&_svg]:stroke-black dark:hocus:[&_svg]:stroke-white-soft'
      onClick={handleEditCardModal}
      aria-label='Edit card'>
      <Icon
        name='pencil'
        className='size-4 stroke-black/50 dark:stroke-white-soft/50'
      />
    </button>
  )
}
