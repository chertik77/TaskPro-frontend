import type { Board, EditBoardModalProps } from '../board.types'

import { useModal } from 'react-modal-state'

import { SidebarMobileModal } from 'features/sidebar/components'

import { TooltipWrapper } from 'components/ui'

import { useDeleteBoard } from '../hooks'
import { EditBoardModal } from './modals'

export const BoardsListActiveItem = ({ board }: { board: Board }) => {
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
        <TooltipWrapper tooltipText='Edit board'>
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
            <svg className='size-4 stroke-black/50 violet:stroke-white/50 dark:stroke-white-primary/50'>
              <use href='/icons.svg#icon-pencil' />
            </svg>
          </div>
        </TooltipWrapper>
        <TooltipWrapper tooltipText='Delete board'>
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
            <svg className='size-4 stroke-black/50 violet:stroke-white/50 dark:stroke-white-primary/50'>
              <use href='/icons.svg#icon-trash' />
            </svg>
          </div>
        </TooltipWrapper>
      </div>
      <div className='h-4xl w-1 rounded-l-lg bg-brand violet:bg-white' />
    </>
  )
}
