import type { Board } from 'types/board.types'

import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { Button } from 'components/ui/Button'

import { useDeleteBoard } from 'hooks/board/useDeleteBoard'

export const SidebarListActiveItem = ({ board }: { board: Board }) => {
  const { open } = useModal('edit-board-modal')

  const { mutateAsync } = useDeleteBoard()

  const handleBoardEdit = () => {
    open({ title: board.title, icon: board.icon })
  }

  const handleBoardDelete = () => {
    toast.promise(mutateAsync(), {
      loading: 'Deleting board...',
      success: () => 'Board has been deleted successfully!',
      error: () =>
        'An error occurred while deleting the board. Please try again later.'
    })
  }

  return (
    <div className='flex gap-5'>
      <div className='flex items-center gap-2'>
      <Button
        onClick={handleBoardEdit}
        iconName='pencil'
        iconClassName='violet:stroke-white/50'
      />
      <Button
        onClick={handleBoardDelete}
        iconName='trash'
        iconClassName='violet:stroke-white/50'
      />
      </div>
      <div className='h-[61px] w-[4px] rounded-l-lg bg-brand violet:bg-white'></div>
    </div>
  )
}
