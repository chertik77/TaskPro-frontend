import type { Board } from 'types'

import { useQueryClient } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'
import { toast } from 'sonner'

import { Button } from 'components/ui'

import { useAppMutation, useGetBoardId } from 'hooks'

import { boardService } from 'services'

import { EditBoardModal } from '../modals'

export const SidebarListActiveItem = ({ board }: { board: Board }) => {
  const boardId = useGetBoardId()

  const navigate = useNavigate()

  const { open } = useModal(EditBoardModal)

  const queryClient = useQueryClient()

  const { mutateAsync } = useAppMutation({
    mutationKey: ['deleteBoard'],
    mutationFn: () => boardService.deleteBoard(boardId),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['boards'] })
      navigate('/dashboard', { replace: true })
    }
  })

  const handleBoardEdit = () => {
    open({ title: board.title, icon: board.icon })
  }

  const handleBoardDelete = () => {
    toast.promise(mutateAsync(), {
      loading: 'Deleting board...',
      success: 'Board has been deleted successfully!',
      error:
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
          data-tooltip-id='edit-board-tooltip'
          data-tooltip-content='Edit board'
        />
        <Button
          onClick={handleBoardDelete}
          iconName='trash'
          iconClassName='violet:stroke-white/50'
          data-tooltip-id='delete-board-tooltip'
          data-tooltip-content='Delete board'
        />
        <Tooltip
          id='edit-board-tooltip'
          delayShow={500}
        />
        <Tooltip
          id='delete-board-tooltip'
          delayShow={500}
        />
      </div>
      <div className='h-[61px] w-[4px] rounded-l-lg bg-brand violet:bg-white'></div>
    </div>
  )
}
