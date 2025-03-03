import { useModal } from 'react-modal-state'

import { Button, Icon } from '@/shared/ui'

import { AddColumnModal } from './AddColumnModal'

export const AddColumnTrigger = () => {
  const { open: openAddColumnModal } = useModal(AddColumnModal)

  return (
    <Button
      onClick={openAddColumnModal}
      aria-label='Add column'
      className='mr-5 flex h-14 min-w-84 max-w-84 items-center justify-center gap-2 bg-white
        px-[79px] -outline-offset-2 disabled:opacity-100 violet:bg-white
        violet:text-black dark:bg-black-soft dark:text-white desktop:mr-6'>
      <Icon
        name='plus'
        className='size-7 rounded-md bg-black text-white violet:bg-brand-violet dark:bg-white
          dark:text-black'
      />
      Add column
    </Button>
  )
}
