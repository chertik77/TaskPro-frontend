import type { CardTypes } from '@/entities/card'

import { useModal } from 'react-modal-state'

import { PlusButton } from '@/shared/ui'

import { AddCardModal } from './AddCardModal'

export const AddCardModalTrigger = ({ columnId }: { columnId: string }) => {
  const { open: openAddCardModal } = useModal(AddCardModal)

  return (
    <PlusButton
      className='mt-3.5'
      aria-label='Add another card'
      onClick={() =>
        openAddCardModal<CardTypes.AddCardModalProps>({ columnId })
      }>
      Add another card
    </PlusButton>
  )
}
