import type { BoardTypes } from '@/entities/board'

import { useModal } from 'react-modal-state'

import { Icon } from '@/shared/ui'

import { EditBoardModal } from './EditBoardModal'

type EditBoardModalTriggerProps = {
  board: BoardTypes.Board
}

export const EditBoardModalTrigger = ({
  board
}: EditBoardModalTriggerProps) => {
  const { open: openEditBoardModal } = useModal(EditBoardModal)

  const handleBoardEdit = () => {
    openEditBoardModal<BoardTypes.EditBoardModalProps>({
      title: board.title,
      icon: board.icon,
      background: board.background.identifier
    })
  }

  return (
    <div
      role='button'
      tabIndex={0}
      aria-label='Edit board'
      onKeyDown={e => {
        if (e.code === 'Enter' || e.code === 'Space') handleBoardEdit()
      }}
      onClick={handleBoardEdit}
      className='focus-visible:styled-outline hocus:*:stroke-black violet:hocus:*:stroke-black
        dark:hocus:*:stroke-white-primary'>
      <Icon
        name='pencil'
        className='size-4 stroke-black/50 violet:stroke-white/50 dark:stroke-white-primary/50'
      />
    </div>
  )
}
