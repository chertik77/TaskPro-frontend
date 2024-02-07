// import { Button } from 'components/ui'

export const SidebarCreateBoardBtn = () => {
  return (
    <div>
      <p className=' mb-2 text-sm font-normal leading-normal tracking-tight opacity-50 violet:text-white violet:text-opacity-50'>
        My boards
      </p>
      <div className='mb-10 flex border-y  border-opacity-50 py-3.5'>
        <p className='mr-[77px] inline-flex w-[76px]  font-medium leading-normal tracking-tight violet:text-white'>
          Create a new board
        </p>
        {/* <Button isAddIcon={true}></Button> */}
            {/* <Button isAddIcon       iconName='help'></Button>  */}
      </div>
    </div>
  )
}
