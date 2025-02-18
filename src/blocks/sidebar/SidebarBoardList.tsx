import { Root } from '@radix-ui/react-radio-group'
import { useNavigate } from '@tanstack/react-router'
import { useModal } from 'react-modal-state'

import { useGetAllBoards } from '@/features/board/get-all-boards'

import { Loader } from '@/shared/components'
import { useGetParamBoardId } from '@/shared/hooks'
import { cn } from '@/shared/lib/cn'

import { SidebarBoardListItem } from './SidebarBoardListItem'
import { SidebarMobileModal } from './SidebarMobileModal'

export const SidebarBoardList = () => {
  const navigate = useNavigate()

  const { boardId } = useGetParamBoardId()

  const { close: closeSidebarMobileModal } = useModal(SidebarMobileModal)

  const { data: boards, isPending } = useGetAllBoards()

  return isPending ? (
    <div className='mb-10 flex h-4xl items-center gap-2 pl-3.5 violet:text-white tablet:pl-6'>
      <Loader className='size-5' />
      Loading your boards...
    </div>
  ) : (
    <Root
      value={boardId}
      onValueChange={v => {
        navigate({ to: '/dashboard/$boardId', params: { boardId: v } })
        closeSidebarMobileModal()
      }}
      className={cn('mb-10 text-base', boards?.length === 0 && 'mb-auto')}>
      {boards?.map(board => (
        <SidebarBoardListItem
          key={board.id}
          board={board}
        />
      ))}
    </Root>
  )
}
