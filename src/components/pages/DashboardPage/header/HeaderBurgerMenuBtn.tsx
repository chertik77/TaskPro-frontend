import { useModal } from 'react-modal-state'

export const HeaderBurgerMenuBtn = () => {
  const { open } = useModal('burger-menu')

  return (
    <button className='desktop:hidden' onClick={open}>
      <svg className='size-6 stroke-black dark:stroke-white'>
        <use xlinkHref='/assets/icons.svg#icon-menu' />
      </svg>
    </button>
  )
}