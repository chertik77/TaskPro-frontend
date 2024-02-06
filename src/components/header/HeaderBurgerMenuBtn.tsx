export const HeaderBurgerMenuBtn = () => {
  return (
    <button className='desktop:hidden'>
      <svg className='size-6 stroke-black dark:stroke-white'>
        <use xlinkHref='/assets/icons.svg#icon-menu' />
      </svg>
    </button>
  )
}
