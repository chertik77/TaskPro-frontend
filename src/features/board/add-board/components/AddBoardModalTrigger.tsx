import { useModal } from 'react-modal-state'

import { SidebarMobileModal } from '@/blocks/sidebar'

import { Icon } from '@/shared/components'

import { AddBoardModal } from './AddBoardModal'

export const AddBoardModalTrigger = () => {
  const { open: openNewBoardModal } = useModal(AddBoardModal)

  const { close: closeSidebarMobileModal } = useModal(SidebarMobileModal)

  return (
    <button
      type='button'
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
  )
}
