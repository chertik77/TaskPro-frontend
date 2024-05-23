import { useModal } from 'react-modal-state'
import { Tooltip } from 'react-tooltip'

import { BurgerMenu, NewBoardModal } from '../modals'

export const SidebarMyBoardsInfo = () => {
  const { open } = useModal(NewBoardModal)

  const { close: closeBurgerMenu } = useModal(BurgerMenu)

  return (
    <div className='mb-10 px-default desktop:px-6'>
      <p
        className='mb-2 text-fs-12-lh-normal-fw-400 text-black/50 violet:text-white/50
          dark:text-white/50'>
        My boards
      </p>
      <div
        className='flex justify-between border-y border-black/10 py-3.5 violet:border-white/10
          dark:border-white/10 tablet:w-[212px]'>
        <p className='w-[76px] text-fs-14-lh-normal-fw-500 violet:text-white'>
          Create a new board
        </p>
        <div className='flex items-center justify-center gap-2'>
          <button
            type='button'
            className='flex h-9 w-10 items-center justify-center rounded-lg bg-brand text-black
              hocus:bg-brand-hover violet:bg-brand-third violet:text-white
              violet:hocus:bg-[#979CEA]'
            onClick={() => {
              open()
              closeBurgerMenu()
            }}
            data-tooltip-id='create-board-tooltip'
            data-tooltip-content='Create board'>
            <svg className='size-5'>
              <use href='/icons.svg#icon-plus-min' />
            </svg>
          </button>
          <Tooltip
            id='create-board-tooltip'
            delayShow={500}
          />
        </div>
      </div>
    </div>
  )
}
