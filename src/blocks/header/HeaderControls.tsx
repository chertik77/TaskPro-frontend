import { BiSidebar } from 'react-icons/bi'
import { useModal } from 'react-modal-state'

import { BurgerMenu } from 'blocks/sidebar/BurgerMenu'
import { useAppDispatch, useAppSelector } from 'hooks/redux'

import { selectIsSidebarOpen, setIsSidebarOpen } from 'redux/sidebar.slice'

export const HeaderControls = () => {
  const { open } = useModal(BurgerMenu)

  const isSidebarOpen = useAppSelector(selectIsSidebarOpen)

  const dispatch = useAppDispatch()

  return (
    <>
      <button
        onClick={() => dispatch(setIsSidebarOpen(!isSidebarOpen))}
        type='button'
        className='focus-visible:styled-outline mr-auto size-5 max-desktop:hidden'>
        <BiSidebar className='size-full violet:text-black' />
      </button>
      <button
        onClick={open}
        type='button'
        className='desktop:hidden'>
        <svg className='size-6 stroke-black dark:stroke-white'>
          <use href='/icons.svg#icon-menu' />
        </svg>
      </button>
    </>
  )
}
