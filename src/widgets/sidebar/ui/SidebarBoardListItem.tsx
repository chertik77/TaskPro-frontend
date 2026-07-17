import type { Board } from '@/shared/api'

import { RovingFocusGroupItem } from '@radix-ui/react-roving-focus'
import { useNavigate, useParams } from '@tanstack/react-router'
import { DynamicIcon } from 'lucide-react/dynamic'

import { DeleteBoardAlertDialog } from '@/features/board/delete'
import { EditBoardDialog } from '@/features/board/edit'

import { cn } from '@/shared/lib'
import { useSidebarStore } from '@/shared/store'

type SidebarBoardListItemProps = {
  board: Omit<Board, 'columns'>
}

export const SidebarBoardListItem = ({ board }: SidebarBoardListItemProps) => {
  const { boardId } = useParams({ strict: false })

  const { setIsOpenMobile } = useSidebarStore()

  const navigate = useNavigate()

  const handleBoardSelect = (id: string) => {
    navigate({ to: '/dashboard/$boardId', params: { boardId: id } })
  }

  return (
    <RovingFocusGroupItem
      key={board.id}
      className={cn(
        `focus-visible:styled-outline tablet:pl-6 pointer-cursors:cursor-pointer
        flex min-h-15.25 w-full items-center justify-between pl-3.5
        text-black/50 dark:text-white/50`,
        boardId === board.id &&
          'bg-white-muted dark:bg-black-muted text-black dark:text-white'
      )}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleBoardSelect(board.id)
        }
      }}
      onClick={() => {
        handleBoardSelect(board.id)
        setIsOpenMobile(false)
      }}>
      <div className='tablet:gap-2 flex items-center gap-1'>
        <DynamicIcon
          name={board.icon}
          className='size-4.5'
        />
        <p className='tablet:w-30.5 w-26.25 truncate text-left whitespace-pre'>
          {board?.title}
        </p>
      </div>
      {boardId === board.id && (
        <div className='flex gap-5'>
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
          <div
            className='flex items-center gap-2'
            onClick={e => e.stopPropagation()}>
            <EditBoardDialog
              data={{
                title: board.title,
                icon: board.icon,
                background: board.background.identifier
              }}
            />
            <DeleteBoardAlertDialog />
          </div>
          <div className='bg-brand h-15.25 w-1 rounded-l-lg' />
        </div>
      )}
    </RovingFocusGroupItem>
  )
}
