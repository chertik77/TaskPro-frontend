import { useModal } from 'react-modal-state'

import { BurgerMenu } from '../modals/BurgerMenu'

export const HeaderBurgerMenuBtn = () => {
  const { open } = useModal(BurgerMenu)

  return (
    <button
      className='desktop:hidden'
      onClick={open}>
      <svg className='size-6 stroke-black dark:stroke-white'>
        <use href='/icons.svg#icon-menu' />
      </svg>
    </button>
  )
}
