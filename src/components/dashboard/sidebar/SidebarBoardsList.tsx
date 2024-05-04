import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'

import { boardService } from 'services/board.service'

import { cn } from 'lib'

import { SidebarListActiveItem } from './SidebarListActiveItem'

export const SidebarBoardsList = () => {
  const { boardId } = useParams()

  const { data } = useQuery({
    queryKey: ['boards'],
    queryFn: () => boardService.getAllBoards()
  })
  return (
    <ul
      className={cn(
        'mb-20 flex flex-col mobile:text-fs-14-lh-1.28-fw-400',
        data?.length === 0 && 'mb-auto'
      )}>
      {data?.map(board => (
        <Link
          to={`/dashboard/${board._id}`}
          key={board._id}>
          <li
            className={cn(
              `flex h-[61px] cursor-pointer items-center justify-between text-black/50 transition
              duration-300 ease-in-out violet:text-white/50 dark:text-white/50 desktop:pl-6`,
              board._id === boardId &&
                `border-1 border-r-dark bg-white-gray text-black violet:bg-white/50
                violet:text-white dark:bg-black-third dark:text-white`
            )}>
            <div className='flex items-center gap-2'>
              <svg className='size-[18px] stroke-current'>
                <use href={`/icons.svg#${board.icon}`}></use>
              </svg>
              <p className='w-[115px] truncate'>{board?.title}</p>
            </div>
            {board._id === boardId && <SidebarListActiveItem board={board} />}
          </li>
        </Link>
      ))}
    </ul>
  )
}
