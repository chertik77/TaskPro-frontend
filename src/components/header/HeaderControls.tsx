import { useModal } from 'react-modal-state'

import { SidebarMobileModal } from 'features/sidebar/components'
import {
  selectIsSidebarOpen,
  setIsSidebarOpen
} from 'features/sidebar/sidebar.slice'

import { Icon } from 'components/ui'
import { useAppDispatch, useAppSelector } from 'hooks/redux'

export const HeaderControls = () => {
  const { open: openSidebarMobileModal } = useModal(SidebarMobileModal)

  const isSidebarOpen = useAppSelector(selectIsSidebarOpen)

  const dispatch = useAppDispatch()

  return (
    <>
      <button
        onClick={() => dispatch(setIsSidebarOpen(!isSidebarOpen))}
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
