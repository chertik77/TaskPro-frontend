import type { BoardTypes } from '@/entities/board'

import { DeleteBoardTrigger } from '@/features/board/delete-board'
import { EditBoardModalTrigger } from '@/features/board/edit-board'

import { useGetParamBoardId } from '@/shared/hooks'
import { Icon } from '@/shared/ui'

type SidebarBoardListItemProps = {
  board: BoardTypes.Board
}

export const SidebarBoardListItem = ({ board }: SidebarBoardListItemProps) => {
  const { boardId } = useGetParamBoardId()

  return (
    <>
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
    </>
  )
}
