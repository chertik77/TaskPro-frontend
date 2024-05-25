import type { Board } from 'types'

import { useQueryClient } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { useNavigate } from 'react-router-dom'
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
    open({
      title: board.title,
      icon: board.icon,
      background: board.background.identifier
    })
  }

  const handleBoardDelete = () => {
    toast.promise(mutateAsync(), {
      loading: 'Deleting board...',
      success: 'The board has been successfully deleted from your account.',
      error:
        'An error occurred while deleting the board. Our technical team has been notified. Please try again shortly.'
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
      <div className='h-[61px] w-[4px] rounded-l-lg bg-brand violet:bg-white' />
    </div>
  )
}
