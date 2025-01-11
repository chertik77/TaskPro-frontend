import { useModal } from 'react-modal-state'

import { SidebarMobileModal } from 'features/sidebar/components'

import { Icon } from 'components/ui'

import { NewBoardModal } from './modals'

export const MyBoardsInfo = () => {
  const { open: openNewBoardModal } = useModal(NewBoardModal)

  const { close: closeSidebarMobileModal } = useModal(SidebarMobileModal)

  return (
    <div className='mb-10 px-3.5 tablet:px-6'>
      <p
        className='mb-2 overflow-hidden text-sm text-black/50 violet:text-white/50
          dark:text-white/50'>
        My boards
      </p>
      <div
        className='flex items-center justify-between border-y border-black/10 py-3.5
          violet:border-white/10 dark:border-white/10'>
        <p className='w-[76px] violet:text-white'>Create a new board</p>
        <button
          aria-label='Create new board'
          className='focus-visible:styled-outline flex h-9 w-10 items-center justify-center
            rounded-lg bg-brand text-black transition-all duration-300 hocus:bg-brand-hover
            violet:bg-brand-third violet:text-white violet:hocus:bg-[#979CEA]'
          onClick={() => {
            openNewBoardModal()
            closeSidebarMobileModal()
          }}>
          <Icon name='plus' />
        </button>
      </div>
    </div>
  )
}
