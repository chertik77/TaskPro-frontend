import { Button } from 'components/ui'
import { useModal } from 'react-modal-state'

export const SidebarCreateBoardBtn = () => {
  const { open } = useModal('new-board-modal')

  return (
    <div>
      <p
        className='mb-2 text-fs-12-lh-normal-fw-400 text-black/50
           violet:text-white/50 dark:text-white/50'>
        My boards
      </p>
      <div
        className='mb-10 flex border-y border-black/10 py-3.5
           violet:border-white/10 dark:border-white/10'>
        <p className='w-[76px] text-fs-14-lh-normal-fw-500 violet:text-white'>
          Create a new board
        </p>
        <Button iconName='plus' isSmallIcon onClick={open} />
      </div>
    </div>
  )
}
