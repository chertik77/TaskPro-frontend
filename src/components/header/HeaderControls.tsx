import { useModal } from 'react-modal-state'
import { Icon } from 'shared/ui/icon'

import { SidebarMobileModal } from 'features/sidebar/components'
import { useSidebarStore } from 'features/sidebar/sidebar.store'

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
          className='size-full fill-white violet:text-black'
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
