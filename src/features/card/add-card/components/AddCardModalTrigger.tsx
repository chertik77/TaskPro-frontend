import type { CardTypes } from '@/entities/card'

import { useModal } from 'react-modal-state'

import { Button } from '@/shared/components'

import { AddCardModal } from './AddCardModal'

export const AddCardModalTrigger = ({ columnId }: { columnId: string }) => {
  const { open: openAddCardModal } = useModal(AddCardModal)

  return (
    <Button
      isPlusIcon
      className='mt-3.5'
      onClick={() =>
        openAddCardModal<CardTypes.AddCardModalProps>({ columnId })
      }>
      Add another card
    </Button>
  )
}
