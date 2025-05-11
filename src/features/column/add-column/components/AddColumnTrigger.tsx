import { useModal } from 'react-modal-state'

import { Icon } from '@/shared/ui'

import { AddColumnModal } from './AddColumnModal'

export const AddColumnTrigger = () => {
  const { open: openAddColumnModal } = useModal(AddColumnModal)

  return (
    <button
      type='button'
      onClick={openAddColumnModal}
      aria-label='Add column'
      className='violet:bg-white violet:text-black dark:bg-black-soft desktop:mr-6 mr-5 flex h-14
        max-w-84 min-w-84 items-center justify-center gap-2 rounded-lg bg-white
        px-[79px] -outline-offset-2 disabled:opacity-100 dark:text-white'>
      <Icon
        name='plus'
        className='violet:bg-brand-violet size-7 rounded-md bg-black text-white dark:bg-white
          dark:text-black'
      />
      Add column
    </button>
  )
}
