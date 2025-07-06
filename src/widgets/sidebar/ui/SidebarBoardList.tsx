import { RovingFocusGroup } from '@radix-ui/react-roving-focus'
import { useQuery } from '@tanstack/react-query'

import { boardQueries } from '@/entities/board'

import { Loader } from '@/shared/ui'

import { SidebarBoardListItem } from './SidebarBoardListItem'

export const SidebarBoardList = () => {
  const { data: boards, isPending } = useQuery(boardQueries.boards())

  return isPending ? (
    <div
      className='violet:text-white tablet:pl-6 mb-10 flex min-h-[61px]
        items-center gap-2 pl-3.5'>
      <Loader className='size-5' />
      Loading your boards...
    </div>
  ) : (
    boards && boards.length > 0 && (
      <RovingFocusGroup className='mb-10 text-base'>
        {boards.map(board => (
          <SidebarBoardListItem
            key={board.id}
            board={board}
          />
        ))}
      </RovingFocusGroup>
    )
  )
}
