import { BiSidebar } from 'react-icons/bi'
import { useModal } from 'react-modal-state'

import { SidebarMobileModal } from 'features/sidebar/components'
import {
  selectIsSidebarOpen,
  setIsSidebarOpen
} from 'features/sidebar/sidebar.slice'

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
        <BiSidebar className='size-full violet:text-black' />
      </button>
      <button
        onClick={openSidebarMobileModal}
        type='button'
        aria-label='Open sidebar mobile modal'
        className='desktop:hidden'>
        <svg className='size-6 stroke-black dark:stroke-white'>
          <use href='/icons.svg#icon-menu' />
        </svg>
      </button>
    </>
  )
}
