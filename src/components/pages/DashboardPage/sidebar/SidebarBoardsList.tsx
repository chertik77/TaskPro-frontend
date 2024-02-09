import { cn } from 'lib/utils'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { useGetAllBoardsQuery } from 'redux/api/dashboard/board'
import { selectBoard } from 'redux/slices/board/board-slice'

export const SidebarBoardsList = () => {
  const { name } = useParams()
  const board = useSelector(selectBoard)
  const { data, refetch } = useGetAllBoardsQuery(undefined)

  useEffect(() => {
    refetch()
  }, [board])

  return (
    <div className='mb-auto'>
      <ul className=''>
        {data?.data.map(board => (
          <li
            key={board._id}
            className={cn(
              'flex h-[61px] w-full cursor-pointer items-center gap-2 text-white/50',
              {
                'rounded-l border-r-4 border-brand bg-black-third':
                  board.title === name?.slice(1)
              }
            )}>
            <NavLink to={`/dashboard/:${board.title}`}>
              <svg className='size-[18px] stroke-current aria-[current=page]:bg-brand'>
                <use xlinkHref={`/assets/icons.svg#${board.icon}`}></use>
              </svg>
              {board?.title}
            </NavLink>
            {/* {isActiveItem && <button className='bg-brand'>Create</button>} */}
          </li>
        ))}
      </ul>
    </div>
  )
}
