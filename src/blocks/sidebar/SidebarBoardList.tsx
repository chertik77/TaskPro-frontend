import { Item, Root } from '@radix-ui/react-roving-focus'
import { useNavigate } from '@tanstack/react-router'

import { useGetAllBoards } from '@/features/board/get-all-boards'

import { useGetParamBoardId } from '@/shared/hooks'
import { cn } from '@/shared/lib/cn'
import { useSidebarStore } from '@/shared/store'
import { Loader } from '@/shared/ui'

import { SidebarBoardListItem } from './SidebarBoardListItem'

export const SidebarBoardList = () => {
  const { data: boards, isPending } = useGetAllBoards()

  const { boardId } = useGetParamBoardId()

  const navigate = useNavigate()

  const toggleMobileSidebar = useSidebarStore(
    state => state.toggleMobileSidebar
  )

  const handleBoardSelect = (boardId: string) => {
    navigate({ to: '/dashboard/$boardId', params: { boardId } })
    toggleMobileSidebar(false)
  }

  return isPending ? (
    <div className='mb-10 flex h-[61px] items-center gap-2 pl-3.5 violet:text-white tablet:pl-6'>
      <Loader className='size-5' />
      Loading your boards...
    </div>
  ) : (
    boards && boards?.length > 0 && (
      <Root asChild>
        <ul
          className='mb-10 text-base'
          role='listbox'>
          {boards.map(board => (
            <Item
              key={board.id}
              asChild>
              <li
                role='option'
                tabIndex={0}
                className={cn(
                  `focus-visible:styled-outline flex h-[61px] w-full items-center justify-between
                    pl-3.5 text-black/50 violet:text-white/50 dark:text-white/50 tablet:pl-6`,
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
                <SidebarBoardListItem board={board} />
              </li>
            </Item>
          ))}
        </ul>
      </Root>
    )
  )
}
