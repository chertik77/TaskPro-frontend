import { Link } from 'react-router-dom'

export const SideBarBoardsItem = () => {
  return (
    <div className='mb-[70px] flex items-center  gap-2 md:mb-[60px] '>
      <Link to='/dashboard' aria-label='Go to Dashboard'>
        <svg width='32' height='32' className=''>
          <use href='/assets/icons.svg#icon-logo'></use>
        </svg>
      </Link>
<div className='text-base font-semibold'>
  <span className='ligth:text-black violet:text-white'>Task Pro</span>
</div>
    </div>
  )
}
