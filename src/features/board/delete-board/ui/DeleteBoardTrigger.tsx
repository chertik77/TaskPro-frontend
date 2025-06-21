import { Icon } from '@/shared/ui'

import { useDeleteBoard } from '../api/useDeleteBoard'

export const DeleteBoardTrigger = () => {
  const { mutate: deleteBoard } = useDeleteBoard()

  return (
    <button
      type='button'
      aria-label='Delete board'
      onClick={() => deleteBoard()}
      className='focus-visible:styled-outline hocus:*:stroke-black
        violet:hocus:*:stroke-white-soft dark:hocus:*:stroke-white-soft'>
      <Icon
        name='trash'
        className='violet:stroke-white/50 dark:stroke-white-soft/50 size-4 stroke-black/50'
      />
    </button>
  )
}
