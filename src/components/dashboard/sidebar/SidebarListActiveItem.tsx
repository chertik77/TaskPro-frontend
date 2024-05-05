import type { Board } from 'types'

import { useQueryClient } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { Button } from 'components/ui'

import { useAppMutation, useGetBoardId } from 'hooks'

import { boardService } from 'services'

export const SidebarListActiveItem = ({ board }: { board: Board }) => {
  const boardId = useGetBoardId()

  const navigate = useNavigate()

  const { open } = useModal('edit-board-modal')

  const queryClient = useQueryClient()

  const { mutateAsync } = useAppMutation({
    mutationKey: ['deleteBoard'],
    mutationFn: () => boardService.deleteBoard(boardId),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['boards'] }).then(() => {
        const boards = queryClient.getQueryData<Board[]>(['boards'])

        if (boards && boards.length > 0) {
          navigate(`/dashboard/${boards[0]._id}`, { replace: true })
        } else navigate('/dashboard')
      })
    }
  })

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
