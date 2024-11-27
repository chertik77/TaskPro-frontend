import { useSidebar } from 'contexts/sidebar.context'
import { BiSidebar } from 'react-icons/bi'
import { useModal } from 'react-modal-state'

import { BurgerMenu } from '../modals/BurgerMenu'

export const HeaderBurgerMenuBtn = () => {
  useModal(BurgerMenu)

  const { isSidebarOpen, setIsSidebarOpen } = useSidebar()

  return (
    <button
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      type='button'
      className='mr-auto pr-1'>
      <BiSidebar className='size-5 violet:text-black' />
    </button>
  )
}
