import type { BoardTypes } from '@/shared/api/board'

import { SidebarMobileModal } from '@/blocks/sidebar'
import { Icon } from '@/shared/components/ui'
import { useModal } from 'react-modal-state'

import { useDeleteBoard } from '../hooks'
import { EditBoardModal } from './modals'

type BoardsListActiveItemProps = {
  board: BoardTypes.Board
}

export const BoardsListActiveItem = ({ board }: BoardsListActiveItemProps) => {
  const { open: openEditBoardModal } = useModal(EditBoardModal)

  const { close: closeSidebarMobileModal } = useModal(SidebarMobileModal)

  const { mutate: deleteBoard } = useDeleteBoard()

  const handleBoardEdit = () => {
    closeSidebarMobileModal()
    openEditBoardModal<BoardTypes.EditBoardModalProps>({
      title: board.title,
      icon: board.icon,
      background: board.background.identifier
    })
  }

  return (
    <>
      <div className='flex items-center gap-2'>
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
        <div
          role='button'
          tabIndex={0}
          aria-label='Delete board'
          onKeyDown={e => {
            if (e.code === 'Enter' || e.code === 'Space') {
              closeSidebarMobileModal()
              deleteBoard()
            }
          }}
          onClick={() => {
            closeSidebarMobileModal()
            deleteBoard()
          }}
          className='focus-visible:styled-outline hocus:*:stroke-black violet:hocus:*:stroke-black
            dark:hocus:*:stroke-white-primary'>
          <Icon
            name='trash'
            className='size-4 stroke-black/50 violet:stroke-white/50 dark:stroke-white-primary/50'
          />
        </div>
      </div>
      <div className='h-4xl w-1 rounded-l-lg bg-brand violet:bg-white' />
    </>
  )
}
