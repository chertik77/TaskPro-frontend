import { Root } from '@radix-ui/react-roving-focus'

import { useGetAllBoards } from '@/features/board/get-all-boards'

import { Loader } from '@/shared/ui'

import { SidebarBoardListItem } from './SidebarBoardListItem'

export const SidebarBoardList = () => {
  const { data: boards, isPending } = useGetAllBoards()

  return isPending ? (
    <div className='mb-10 flex h-[61px] items-center gap-2 pl-3.5 violet:text-white tablet:pl-6'>
      <Loader className='size-5' />
      Loading your boards...
    </div>
  ) : (
    boards && boards.length > 0 && (
      <Root asChild>
        <ul
          className='mb-10 text-base'
          role='listbox'>
          {boards.map(board => (
            <SidebarBoardListItem
              key={board.id}
              board={board}
            />
          ))}
        </ul>
      </Root>
    )
  )
}
