import { useModal } from 'react-modal-state'

import { Button } from 'components/ui'

export const BoardAddColumnBtn = () => {
  const { open } = useModal('add-column-modal')

  return (
    <Button
      onClick={open}
      className='flex h-[56px] min-w-[335px] max-w-[335px] items-center gap-2 bg-white px-[79px]
        violet:bg-white violet:text-black dark:bg-black-secondary dark:text-white'>
      <svg
        className='size-7 rounded-md bg-black text-white violet:bg-brand-secondary dark:bg-white
          dark:text-black'>
        <use href='/icons.svg#icon-plus-create' />
      </svg>
      Add another column
    </Button>
  )
}
