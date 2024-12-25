import type { Board } from 'types'

import { useModal } from 'react-modal-state'

import { useDeleteBoard } from 'hooks/board'

import { BurgerMenu, EditBoardModal } from '../modals'

export const SidebarListActiveItem = ({
  board: { icon, title, background }
}: {
  board: Board
}) => {
  const { open } = useModal(EditBoardModal)

  const { close } = useModal(BurgerMenu)

  const { mutate: deleteBoard } = useDeleteBoard()

  const handleBoardEdit = () => {
    close()
    open({ icon, title, background: background.identifier })
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
              close()
              deleteBoard()
            }
          }}
          onClick={() => {
            close()
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
