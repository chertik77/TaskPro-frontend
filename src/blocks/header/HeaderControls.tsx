import { useModal } from 'react-modal-state'

import { SidebarMobileModal } from '@/blocks/sidebar'

import { Icon } from '@/shared/components/ui'
import { useSidebarStore } from '@/shared/store'

export const HeaderControls = () => {
  const { open: openSidebarMobileModal } = useModal(SidebarMobileModal)

  const setIsSidebarOpen = useSidebarStore(state => state.setIsSidebarOpen)

  return (
    <>
      <button
        onClick={() => setIsSidebarOpen(prev => !prev)}
        type='button'
        aria-label='Toggle sidebar'
        className='focus-visible:styled-outline mr-auto size-5 max-desktop:hidden'>
        <Icon
          name='sidebar'
          className='size-full fill-white violet:fill-black/80'
        />
      </button>
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
