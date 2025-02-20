import { useSidebarStore } from '@/shared/store'
import { Icon } from '@/shared/ui'

import { useDeleteBoard } from '../hooks/useDeleteBoard'

export const DeleteBoardTrigger = () => {
  const setIsOpenOnMobile = useSidebarStore(state => state.setIsOpenOnMobile)

  const { mutate: deleteBoard } = useDeleteBoard()

  return (
    <div
      role='button'
      tabIndex={0}
      aria-label='Delete board'
      onKeyDown={e => {
        if (e.code === 'Enter' || e.code === 'Space') {
          setIsOpenOnMobile(false)
          deleteBoard()
        }
      }}
      onClick={() => {
        setIsOpenOnMobile(false)
        deleteBoard()
      }}
      className='focus-visible:styled-outline hocus:*:stroke-black violet:hocus:*:stroke-black
        dark:hocus:*:stroke-white-primary'>
      <Icon
        name='trash'
        className='size-4 stroke-black/50 violet:stroke-white/50 dark:stroke-white-primary/50'
      />
    </div>
  )
}
