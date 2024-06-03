import type { Board } from 'types'

import { useModal } from 'react-modal-state'

import { Button } from 'components/ui'

import { useDeleteBoard } from 'hooks/board/useDeleteBoard'

import { EditBoardModal } from '../modals'

export const SidebarListActiveItem = ({ board }: { board: Board }) => {
  const { open } = useModal(EditBoardModal)

  const { mutate, isPending } = useDeleteBoard()

  const handleBoardEdit = () => {
    open({
      title: board.title,
      icon: board.icon,
      background: board.background.identifier
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
          onClick={() => mutate()}
          iconName='trash'
          disabled={isPending}
          iconClassName='violet:stroke-white/50'
        />
      </div>
      <div className='h-4xl w-1 rounded-l-lg bg-brand violet:bg-white' />
    </div>
  )
}
