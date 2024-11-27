import { useSidebar } from 'contexts/sidebar.context'
import { useModal } from 'react-modal-state'

import { cn } from 'lib'

import { BurgerMenu, NewBoardModal } from '../modals'

export const SidebarMyBoardsInfo = () => {
  const { open } = useModal(NewBoardModal)

  const { close: closeBurgerMenu } = useModal(BurgerMenu)
  const { isSidebarOpen } = useSidebar()

  return (
    <div className={cn('mb-10 px-3.5', isSidebarOpen && 'tablet:px-6')}>
      <div className='h-5'>
        <p
          className={cn(
            `mb-2 overflow-hidden text-sm text-black/50 transition-all duration-300
            violet:text-white/50 dark:text-white/50`,
            isSidebarOpen ? 'opacity-100' : 'h-0 opacity-0'
          )}>
          My boards
        </p>
      </div>
      <div
        className={cn(
          `flex items-center justify-center border-y border-black/10 py-3.5
          violet:border-white/10 dark:border-white/10`,
          isSidebarOpen && 'justify-between'
        )}>
        {isSidebarOpen && (
          <p className='w-[76px] violet:text-white'>Create a new board</p>
        )}
        <button
          type='button'
          className={cn(
            `flex h-9 w-10 items-center justify-center rounded-lg bg-brand text-black
            transition-all duration-300 hocus:bg-brand-hover violet:bg-brand-third
            violet:text-white violet:hocus:bg-[#979CEA]`
          )}
          onClick={() => {
            open()
            closeBurgerMenu()
          }}>
          <svg className='size-5'>
            <use href='/icons.svg#icon-plus-min' />
          </svg>
        </button>
      </div>
    </div>
  )
}
