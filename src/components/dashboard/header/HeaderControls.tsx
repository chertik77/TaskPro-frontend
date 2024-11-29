import { BiSidebar } from 'react-icons/bi'
import { useModal } from 'react-modal-state'
import { useDispatch, useSelector } from 'react-redux'

import { selectIsSidebarOpen, setIsSidebarOpen } from 'redux/sidebar.slice'

import { BurgerMenu } from '../modals/BurgerMenu'

export const HeaderControls = () => {
  const { open } = useModal(BurgerMenu)

  const isSidebarOpen = useSelector(selectIsSidebarOpen)

  const dispatch = useDispatch()

  return (
    <>
      <button
        onClick={() => dispatch(setIsSidebarOpen(!isSidebarOpen))}
        type='button'
        className='mr-auto'>
        <BiSidebar className='size-5 violet:text-black' />
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
