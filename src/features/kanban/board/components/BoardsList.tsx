import { Indicator, Item, Root } from '@radix-ui/react-radio-group'
import { useModal } from 'react-modal-state'
import { useNavigate } from 'react-router-dom'

import { SidebarMobileModal } from 'features/sidebar/components'

import { Loader } from 'components/ui'

import { Pages } from 'config'

import { cn } from 'lib'

import { useGetAllBoards, useGetBoardId } from '../hooks'
import { BoardsListActiveItem } from './BoardsListActiveItem'

export const BoardsList = () => {
  const navigate = useNavigate()

  const boardId = useGetBoardId()

  const { close: closeSidebarMobileModal } = useModal(SidebarMobileModal)

  const { data: boards, isPending } = useGetAllBoards()

  return isPending ? (
    <div className='flex h-4xl items-center gap-2 pl-3.5 violet:text-white tablet:pl-6'>
      <Loader className='size-5' />
      Loading your boards...
    </div>
  ) : (
    <Root
      value={boardId}
      onValueChange={v => {
        navigate(`${Pages.Dashboard}/${v}`)
        closeSidebarMobileModal()
      }}
      className={cn('mb-10 text-base', boards?.length === 0 && 'mb-auto')}>
      {boards?.map(board => (
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
            <svg className='size-lg stroke-current'>
              <use href={`/icons.svg#${board.icon}`} />
            </svg>
            <p className='w-[105px] truncate whitespace-pre text-left tablet:w-[122px]'>
              {board?.title}
            </p>
          </div>
          <Indicator className='flex gap-5'>
            <BoardsListActiveItem board={board} />
          </Indicator>
        </Item>
      ))}
    </Root>
  )
}
