import { Indicator, Item } from '@radix-ui/react-radio-group'

import { DeleteBoardTrigger } from '@/features/board/delete-board/components'
import { EditBoardModalTrigger } from '@/features/board/edit-board/components'

import { BoardTypes } from '@/shared/api/board'
import { Icon } from '@/shared/components/ui'
import { cn } from '@/shared/lib'

type BoardListItemProps = {
  board: BoardTypes.Board
}

export const BoardListItem = ({ board }: BoardListItemProps) => (
  <Item
    className={cn(
      `focus-visible:styled-outline flex h-4xl w-full items-center justify-between
      pl-3.5 text-black/50 aria-checked:bg-white-gray aria-checked:text-black
      violet:text-white/50 aria-checked:violet:bg-white/50
      aria-checked:violet:text-white dark:text-white/50
      aria-checked:dark:bg-black-third aria-checked:dark:text-white tablet:pl-6`
    )}
    key={board.id}
    value={board.id}>
    <div className='flex items-center gap-1 tablet:gap-2'>
      <Icon
        name={board.icon}
        className='size-lg stroke-current'
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
      <div className='h-4xl w-1 rounded-l-lg bg-brand violet:bg-white' />
    </Indicator>
  </Item>
)
