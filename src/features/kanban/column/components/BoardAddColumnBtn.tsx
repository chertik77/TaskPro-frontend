import { useModal } from 'react-modal-state'
import { Button, Icon } from 'shared/components/ui'

import { AddColumnModal } from './modals'

export const BoardAddColumnBtn = () => {
  const { open: openAddColumnModal } = useModal(AddColumnModal)

  return (
    <Button
      onClick={openAddColumnModal}
      className='mr-5 flex h-3xl min-w-8xl max-w-8xl items-center justify-center gap-2 bg-white
        px-[79px] -outline-offset-2 disabled:opacity-100 violet:bg-white
        violet:text-black dark:bg-black-secondary dark:text-white desktop:mr-6'>
      <Icon
        name='plus'
        className='size-7 rounded-md bg-black text-white violet:bg-brand-secondary dark:bg-white
          dark:text-black'
      />
      Add another column
    </Button>
  )
}
