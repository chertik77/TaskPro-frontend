import { useQuery } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { Link } from 'react-router-dom'

import { useGetBoardId } from 'hooks'

import { boardService } from 'services'

import { cn } from 'lib'

import { BurgerMenu } from '../modals'
import { SidebarListActiveItem } from './SidebarListActiveItem'

export const SidebarBoardsList = () => {
  const boardId = useGetBoardId()

  const { close: closeBurgerMenu } = useModal(BurgerMenu)

  const { data } = useQuery({
    queryKey: ['boards'],
    queryFn: () => boardService.getAllBoards()
  })

  return (
    <div
      className={cn(
        'mb-20 text-fs-14-lh-1.28-fw-400',
        data?.length === 0 && 'mb-auto'
      )}>
      {data?.map(board => (
        <Link
          onClick={closeBurgerMenu}
          className={cn(
            `flex h-[61px] items-center justify-between pl-default text-black/50
            violet:text-white/50 dark:text-white/50 desktop:pl-6`,
            board._id === boardId &&
              `bg-white-gray text-black violet:bg-white/50 violet:text-white
              dark:bg-black-third dark:text-white`
          )}
          to={`/dashboard/${board._id}`}
          key={board._id}>
          <div className='flex items-center gap-2'>
            <svg className='size-[18px] stroke-current'>
              <use href={`/icons.svg#${board.icon}`}></use>
            </svg>
            <p className='w-[115px] truncate'>{board?.title}</p>
          </div>
          {board._id === boardId && <SidebarListActiveItem board={board} />}
        </Link>
      ))}
    </div>
  )
}
