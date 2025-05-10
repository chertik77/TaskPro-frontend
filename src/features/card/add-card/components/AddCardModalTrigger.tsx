import type { CardTypes } from '@/entities/card'

import { useModal } from 'react-modal-state'

import { PlusButtonWithLoader } from '@/shared/ui'

import { AddCardModal } from './AddCardModal'

export const AddCardModalTrigger = ({ columnId }: { columnId: string }) => {
  const { open: openAddCardModal } = useModal(AddCardModal)

  return (
    <PlusButtonWithLoader
      className='mt-3.5'
      aria-label='Add card'
      onClick={() =>
        openAddCardModal<CardTypes.AddCardModalSchema>({ columnId })
      }>
      Add card
    </PlusButtonWithLoader>
  )
}
