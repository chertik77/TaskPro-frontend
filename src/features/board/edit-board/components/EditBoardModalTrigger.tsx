import type { BoardTypes } from '@/entities/board'

import { useModal } from 'react-modal-state'

import { Icon } from '@/shared/ui'

import { EditBoardModal } from './EditBoardModal'

type EditBoardModalTriggerProps = {
  board: BoardTypes.BoardSchema
}

export const EditBoardModalTrigger = ({
  board
}: EditBoardModalTriggerProps) => {
  const { open: openEditBoardModal } = useModal(EditBoardModal)

  const handleBoardEdit = () => {
    openEditBoardModal<BoardTypes.EditBoardModalSchema>({
      title: board.title,
      icon: board.icon,
      background: board.background.identifier
    })
  }

  return (
    <button
      type='button'
      aria-label='Edit board'
      onClick={handleBoardEdit}
      className='focus-visible:styled-outline hocus:*:stroke-black
        violet:hocus:*:stroke-white-soft dark:hocus:*:stroke-white-soft'>
      <Icon
        name='pencil'
        className='size-4 stroke-black/50 violet:stroke-white/50 dark:stroke-white-soft/50'
      />
    </button>
  )
}
