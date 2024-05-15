import { useModal } from 'react-modal-state'

import { BurgerModal } from '../modals/burger-menu/burger-Modal'

export const HeaderBurgerMenuBtn = () => {
  const { open } = useModal(BurgerModal)

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
