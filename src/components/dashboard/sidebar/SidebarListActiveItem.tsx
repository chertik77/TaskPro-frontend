import type { Board } from 'types/board.types'

import { useModal } from 'react-modal-state'

import { Button } from 'components/ui/Button'

import { useDeleteBoard } from 'hooks/board/useDeleteBoard'

export const SidebarListActiveItem = ({ board }: { board: Board }) => {
  const { open } = useModal('edit-board-modal')

  const { mutate } = useDeleteBoard()

  const handleEdit = () => {
    open({ title: board.title, icon: board.icon })
  }

  return (
    <div className='flex items-center gap-2'>
      <Button
        onClick={handleEdit}
        iconName='pencil'
        iconClassName='violet:stroke-white/50'
      />
      <Button
        onClick={() => mutate()}
        iconName='trash'
        iconClassName='violet:stroke-white/50'
      />
      <div className='h-[61px] w-[4px] rounded-l-lg bg-brand violet:bg-white'></div>
    </div>
  )
}
