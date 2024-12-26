import type {
  Board,
  EditBoardModalProps
} from 'features/kanban/board/board.types'

import { useModal } from 'react-modal-state'

import { EditBoardModal } from 'features/kanban/board/components/modals'
import { useDeleteBoard } from 'features/kanban/board/hooks'

import { SidebarMobileModal } from './SidebarMobileModal'

export const SidebarListActiveItem = ({ board }: { board: Board }) => {
  const { open: openEditBoardModal } = useModal(EditBoardModal)

  const { close: closeSidebarMobileModal } = useModal(SidebarMobileModal)

  const { mutate: deleteBoard } = useDeleteBoard()

  const handleBoardEdit = () => {
    closeSidebarMobileModal()
    openEditBoardModal<EditBoardModalProps>({
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
          onKeyDown={e => {
            if (e.code === 'Enter' || e.code === 'Space') handleBoardEdit()
          }}
          onClick={handleBoardEdit}
          className='focus-visible:styled-outline hocus:*:stroke-black violet:hocus:*:stroke-black
            dark:hocus:*:stroke-white-primary'>
          <svg className='size-4 stroke-black/50 violet:stroke-white/50 dark:stroke-white-primary/50'>
            <use href='/icons.svg#icon-pencil' />
          </svg>
        </div>
        <div
          role='button'
          tabIndex={0}
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
          <svg className='size-4 stroke-black/50 violet:stroke-white/50 dark:stroke-white-primary/50'>
            <use href='/icons.svg#icon-trash' />
          </svg>
        </div>
      </div>
      <div className='h-4xl w-1 rounded-l-lg bg-brand violet:bg-white' />
    </>
  )
}