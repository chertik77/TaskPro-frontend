import { useSidebar } from 'contexts/sidebar.context'
import { BiSidebar } from 'react-icons/bi'
import { useModal } from 'react-modal-state'

import { BurgerMenu } from '../modals/BurgerMenu'

export const HeaderBurgerMenuBtn = () => {
  const { open } = useModal(BurgerMenu)

  const { isSidebarOpen, setIsSidebarOpen } = useSidebar()

  return (
    <>
      {!isSidebarOpen ? (
        <button
          onClick={() => setIsSidebarOpen(true)}
          type='button'
          className='mr-auto'>
          <BiSidebar className='size-5 violet:text-white' />
        </button>
      ) : (
        <button
          className='desktop:hidden'
          onClick={open}>
          <svg className='size-6 stroke-black dark:stroke-white'>
            <use href='/icons.svg#icon-menu' />
          </svg>
        </button>
      )}
    </>
  )
}
