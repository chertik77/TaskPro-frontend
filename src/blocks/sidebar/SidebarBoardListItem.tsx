import type { BoardTypes } from '@/entities/board'

import { Indicator, Item } from '@radix-ui/react-radio-group'

import { DeleteBoardTrigger } from '@/features/board/delete-board'
import { EditBoardModalTrigger } from '@/features/board/edit-board'

import { cn } from '@/shared/lib/cn'
import { Icon } from '@/shared/ui'

type SidebarBoardListItemProps = {
  board: BoardTypes.Board
}

export const SidebarBoardListItem = ({ board }: SidebarBoardListItemProps) => (
  <Item
    className={cn(
      `focus-visible:styled-outline flex h-[61px] w-full items-center justify-between
      pl-3.5 text-black/50 aria-checked:bg-white-muted aria-checked:text-black
      violet:text-white/50 aria-checked:violet:bg-white/50
      aria-checked:violet:text-white dark:text-white/50
      aria-checked:dark:bg-black-muted aria-checked:dark:text-white tablet:pl-6`
    )}
    key={board.id}
    value={board.id}>
    <div className='flex items-center gap-1 tablet:gap-2'>
      <Icon
        name={board.icon}
        className='size-4.5 stroke-current'
      />
      <p className='w-[105px] truncate whitespace-pre text-left tablet:w-[122px]'>
        {board?.title}
      </p>
    </div>
    <Indicator className='flex gap-5'>
      <div className='flex items-center gap-2'>
        <EditBoardModalTrigger board={board} />
        <DeleteBoardTrigger />
      </div>
      <div className='h-[61px] w-1 rounded-l-lg bg-brand violet:bg-white' />
    </Indicator>
  </Item>
)
