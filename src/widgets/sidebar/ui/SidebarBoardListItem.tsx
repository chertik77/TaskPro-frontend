import type { BoardTypes } from '@/entities/board'

import { RovingFocusGroupItem } from '@radix-ui/react-roving-focus'
import { useNavigate, useParams } from '@tanstack/react-router'

import { DeleteBoardTrigger } from '@/features/board/delete-board'
import { EditBoardDialog } from '@/features/board/edit-board'

import { cn } from '@/shared/lib'
import { Icon } from '@/shared/ui'

type SidebarBoardListItemProps = {
  board: Omit<BoardTypes.BoardSchema, 'columns'>
}

export const SidebarBoardListItem = ({ board }: SidebarBoardListItemProps) => {
  const { boardId } = useParams({ strict: false })

  const navigate = useNavigate()

  const handleBoardSelect = (id: string) => {
    navigate({ to: '/dashboard/$boardId', params: { boardId: id } })
  }

  return (
    <RovingFocusGroupItem
      key={board.id}
      className={cn(
        `focus-visible:styled-outline violet:text-white/50 tablet:pl-6 flex
        min-h-[61px] w-full cursor-pointer items-center justify-between pl-3.5
        text-black/50 dark:text-white/50`,
        boardId === board.id &&
          `bg-white-muted violet:bg-white/50 violet:text-white
          dark:bg-black-muted text-black dark:text-white`
      )}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleBoardSelect(board.id)
        }
      }}
      onClick={() => handleBoardSelect(board.id)}>
      <div className='tablet:gap-2 flex items-center gap-1'>
        <Icon
          name={board.icon}
          className='size-4.5'
        />
        <p
          className='tablet:w-[122px] w-[105px] truncate text-left
            whitespace-pre'>
          {board?.title}
        </p>
      </div>
      {boardId === board.id && (
        <div className='flex gap-5'>
          <div className='flex items-center gap-2'>
            <EditBoardDialog
              data={{
                title: board.title,
                icon: board.icon,
                background: board.background.identifier
              }}
            />
            <DeleteBoardTrigger />
          </div>
          <div className='bg-brand violet:bg-white h-[61px] w-1 rounded-l-lg' />
        </div>
      )}
    </RovingFocusGroupItem>
  )
}
