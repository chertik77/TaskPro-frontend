import type { CardTypes } from '@/shared/api/card'

import { useModal } from 'react-modal-state'

import { Button } from '@/shared/components/ui'

import { AddCardModal } from './modals'

export const BoardAddCardBtn = ({ columnId }: { columnId: string }) => {
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
