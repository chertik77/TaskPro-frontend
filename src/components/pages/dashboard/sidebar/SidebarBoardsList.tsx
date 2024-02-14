import { cn } from 'lib/utils'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useGetAllBoardsQuery } from 'redux/api/dashboard/board'
import { selectBoard } from 'redux/slices/board/board-slice'
import { SideBarBoardsItem } from './SideBarBoardsItem'

export const SidebarBoardsList = () => {
  const { name } = useParams()
  const board = useSelector(selectBoard)
  const { data, refetch } = useGetAllBoardsQuery(undefined)

  useEffect(() => {
    refetch()
  }, [board])

  return (
    <div className='mb-auto'>
      <ul className='flex flex-col'>
        {data?.data.map(board => (
          <li
            key={board._id}
            className={cn(
              'flex h-[61px] w-[258px] cursor-pointer items-center pl-6  text-black/50 transition duration-300 ease-in-out violet:text-white/50 dark:text-white/50',
              board.title === name &&
                'border-1 border-s-wite-500 border-r-dark text-black violet:bg-white/50 violet:text-white  light:bg-white-gray dark:bg-black-third dark:text-white'
            )}>
            <SideBarBoardsItem board={board} />
          </li>
        ))}
      </ul>
    </div>
  )
}
