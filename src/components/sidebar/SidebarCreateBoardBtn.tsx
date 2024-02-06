import { Button } from 'components/ui'

export const SidebarCreateBoardBtn = () => {
  return (
    <div>
      <span className=' mb-2 text-sm font-normal leading-normal tracking-tight opacity-50 '>
        My boards
      </span>
      <div className='mb-10 flex border-y  border-opacity-50 py-3.5'>
        <p className='mr-[77px] inline-flex w-[76px]  font-medium leading-normal tracking-tight'>
          Create a new board
        </p>
        <Button />
      </div>
    </div>
  )
}
