import type { ReactNode } from 'react'

import { useModal } from 'react-modal-state'

import { AddBoardModal } from './AddBoardModal'

type AddBoardModalTriggerProps = {
  children: ReactNode
  className?: string
}

export const AddBoardModalTrigger = ({
  className,
  children
}: AddBoardModalTriggerProps) => {
  const { open: openAddBoardModal } = useModal(AddBoardModal)

  return (
    <button
      type='button'
      aria-label='Create new board'
      className={className}
      onClick={openAddBoardModal}>
      {children}
    </button>
  )
}
