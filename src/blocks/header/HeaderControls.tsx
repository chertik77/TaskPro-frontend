import { useModal } from 'react-modal-state'

import { ToggleSidebarTrigger } from '@/features/toggle-sidebar'

import { SidebarMobileModal } from '@/blocks/sidebar'

import { Icon } from '@/shared/ui'

export const HeaderControls = () => {
  const { open: openSidebarMobileModal } = useModal(SidebarMobileModal)

  return (
    <>
      <ToggleSidebarTrigger />
      <button
        onClick={openSidebarMobileModal}
        type='button'
        aria-label='Open sidebar mobile modal'
        className='desktop:hidden'>
        <Icon
          name='menu'
          className='size-6 stroke-black dark:stroke-white'
        />
      </button>
    </>
  )
}
