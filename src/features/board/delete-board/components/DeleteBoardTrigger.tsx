import { useSidebarStore } from '@/shared/store'
import { Icon } from '@/shared/ui'

import { useDeleteBoard } from '../hooks/useDeleteBoard'

export const DeleteBoardTrigger = () => {
  const toggleMobileSidebar = useSidebarStore(
    state => state.toggleMobileSidebar
  )

  const { mutate: deleteBoard } = useDeleteBoard()

  return (
    <button
      type='button'
      aria-label='Delete board'
      onClick={() => {
        toggleMobileSidebar(false)
        deleteBoard()
      }}
      className='focus-visible:styled-outline hocus:*:stroke-black
        violet:hocus:*:stroke-white-soft dark:hocus:*:stroke-white-soft'>
      <Icon
        name='trash'
        className='size-4 stroke-black/50 violet:stroke-white/50 dark:stroke-white-soft/50'
      />
    </button>
  )
}
