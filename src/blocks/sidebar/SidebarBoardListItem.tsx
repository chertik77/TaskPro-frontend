import type { BoardTypes } from '@/entities/board'

import { Item } from '@radix-ui/react-roving-focus'
import { useNavigate, useParams } from '@tanstack/react-router'

import { DeleteBoardTrigger } from '@/features/board/delete-board'
import { EditBoardModalTrigger } from '@/features/board/edit-board'

import { cn } from '@/shared/lib/cn'
import { useSidebarStore } from '@/shared/store'
import { Icon } from '@/shared/ui'

type SidebarBoardListItemProps = {
  board: BoardTypes.BoardSchema
}

export const SidebarBoardListItem = ({ board }: SidebarBoardListItemProps) => {
  const { boardId } = useParams({ strict: false })

  const navigate = useNavigate()

  const toggleMobileSidebar = useSidebarStore(
    state => state.toggleMobileSidebar
  )

  const handleBoardSelect = (id: string) => {
    navigate({ to: '/dashboard/$boardId', params: { boardId: id } })
    toggleMobileSidebar(false)
  }

  return (
    <Item
      key={board.id}
      asChild>
      <li
        role='option'
        tabIndex={0}
        className={cn(
          `focus-visible:styled-outline flex h-[61px] w-full cursor-pointer items-center
          justify-between pl-3.5 text-black/50 violet:text-white/50 dark:text-white/50
          tablet:pl-6`,
          boardId === board.id &&
            `bg-white-muted text-black violet:bg-white/50 violet:text-white
            dark:bg-black-muted dark:text-white`
        )}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleBoardSelect(board.id)
          }
        }}
        onClick={() => handleBoardSelect(board.id)}>
        <div className='flex items-center gap-1 tablet:gap-2'>
          <Icon
            name={board.icon}
            className='size-4.5 stroke-current'
          />
          <p className='w-[105px] truncate whitespace-pre text-left tablet:w-[122px]'>
            {board?.title}
          </p>
        </div>
        {boardId === board.id && (
          <div className='flex gap-5'>
            <div className='flex items-center gap-2'>
              <EditBoardModalTrigger board={board} />
              <DeleteBoardTrigger />
            </div>
            <div className='h-[61px] w-1 rounded-l-lg bg-brand violet:bg-white' />
          </div>
        )}
      </li>
    </Item>
  )
}
