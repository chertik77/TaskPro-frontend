import { Item, Root } from '@radix-ui/react-radio-group'
import { useQuery } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { useNavigate } from 'react-router-dom'

import { useGetBoardId } from 'hooks'

import { boardService } from 'services'

import { cn } from 'lib'

import { BurgerMenu } from '../modals'
import { SidebarListActiveItem } from './SidebarListActiveItem'

export const SidebarBoardsList = () => {
  const boardId = useGetBoardId()

  const navigate = useNavigate()

  const { close: closeBurgerMenu } = useModal(BurgerMenu)

  const { data } = useQuery({
    queryKey: ['boards'],
    queryFn: () => boardService.getAllBoards()
  })

  return (
    <Root
      onValueChange={v => navigate(`/dashboard/${v}`)}
      className={cn(
        'mb-20 text-fs-14-lh-1.28-fw-400',
        data?.length === 0 && 'mb-auto'
      )}>
      {data?.map(board => (
        <Item
          className={cn(
            `flex h-[61px] w-full items-center justify-between pl-default text-black/50
            transition-colors ease-in-out aria-checked:bg-white-gray aria-checked:text-black
            focus:outline-none violet:text-white/50 aria-checked:violet:bg-white/50
            aria-checked:violet:text-white dark:text-white/50
            aria-checked:dark:bg-black-third aria-checked:dark:text-white tablet:pl-6`
          )}
          onClick={closeBurgerMenu}
          checked={board.id === boardId}
          key={board.id}
          value={board.id}>
          <div className='flex items-center gap-2'>
            <svg className='size-[18px] stroke-current'>
              <use href={`/icons.svg#${board.icon}`}></use>
            </svg>
            <p className='truncate'>{board?.title}</p>
          </div>
          {board.id === boardId && <SidebarListActiveItem board={board} />}
        </Item>
      ))}
    </Root>
  )
}
