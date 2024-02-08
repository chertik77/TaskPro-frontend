import { Button } from 'components/ui'

import { useModal } from 'react-modal-state'
export const SideBarBoardsItem = () => {
  const { open } = useModal('edit-board-modal')
  return (
    <div className='ml-6 inline-flex h-[61px] items-center justify-center text-black'>
      <div className='mr-[43px] inline-flex items-center justify-center gap-1'>
        <svg className='size-[18px] stroke-current'>
          {/* <use xlinkHref={`/assets/icons.svg#${respons.icon}`}></use> */}
          <use xlinkHref={`/assets/icons.svg#icon-loading-3`}></use>
        </svg>
        <h3>respons.title</h3>
      </div>
      <ul className='mr-[14px] inline-flex items-center justify-center gap-2'>
        <li>
          {/* <Button className='size-4 opacity-50 hocus:text-brand-hover violet:hocus:text-brand-secondary-hover'>
            <svg className='size-4 stroke-current'>
              <use xlinkHref={'/assets/icons.svg#icon-pencil-btn'}></use>
            </svg>
          </Button> */}
          <Button isSmallIcon iconName='pencil' onClick={open} />
        </li>
        <li>
          <Button isSmallIcon iconName='trash' />
        </li>
      </ul>
      <div className='h-[61px] w-1 bg-brand  violet:bg-white'></div>
    </div>
  )
}
