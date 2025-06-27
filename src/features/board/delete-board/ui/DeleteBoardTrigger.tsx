import { Icon } from '@/shared/ui'

import { useDeleteBoard } from '../api/useDeleteBoard'

export const DeleteBoardTrigger = () => {
  const { mutate: deleteBoard } = useDeleteBoard()

  return (
    <button
      type='button'
      aria-label='Delete board'
      onClick={() => deleteBoard()}
      className='focus-visible:styled-outline hocus:text-black violet:hocus:text-white-soft
        dark:hocus:text-white-soft dark:text-white-soft/50 violet:text-white-soft/50
        text-black/50'>
      <Icon
        name='trash'
        className='size-4'
      />
    </button>
  )
}
