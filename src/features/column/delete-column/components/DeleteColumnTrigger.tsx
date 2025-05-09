import { Icon } from '@/shared/ui'

import { useDeleteColumn } from '../hooks/useDeleteColumn'

export const DeleteColumnTrigger = ({ columnId }: { columnId: string }) => {
  const { mutate: deleteColumn } = useDeleteColumn()

  return (
    <button
      type='button'
      className='focus-visible:styled-outline hocus:[&_svg]:stroke-black
        violet:hocus:[&_svg]:stroke-black dark:hocus:[&_svg]:stroke-white-soft'
      onClick={() => deleteColumn({ columnId })}
      aria-label='Delete column'>
      <Icon
        name='trash'
        className='size-4 stroke-black/50 dark:stroke-white-soft/50'
      />
    </button>
  )
}
