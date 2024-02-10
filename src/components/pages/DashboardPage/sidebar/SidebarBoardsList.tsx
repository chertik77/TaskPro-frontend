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
      <ul className='flex flex-col'>
        {data?.data.map(board => (
          <li
            key={board._id}
            className={cn(
              'flex h-[61px] w-[258px] cursor-pointer items-center pl-6  text-black/50 transition duration-300 ease-in-out violet:text-white/50 dark:text-white/50',
              {
                ' border-1 border-s-wite-500 border-r-dark text-black violet:bg-white/50 violet:text-white dark:bg-black-third  dark:text-white':
                  board.title === name?.slice(1)
              }
            )}>
            <NavLink
              to={`/dashboard/:${board.title}`}
              className='flex w-full items-center gap-2'>
              <svg className='size-[18px] stroke-current  aria-[current=page]:bg-brand'>
                <use xlinkHref={`/assets/icons.svg#${board.icon}`}></use>
              </svg>
              <p className='w-[115px] truncate'>{board?.title}</p>
            </NavLink>
            {board.title === name?.slice(1) && (
              <div className='flex items-center gap-2 '>
                <svg className='size-4 aria-[current=page]:bg-brand hocus:text-brand-hover violet:hocus:text-brand-secondary'>
                  <use xlinkHref={`/assets/icons.svg#icon-pencil-btn`}></use>
                </svg>
                <svg className='size-4 aria-[current=page]:bg-brand hocus:text-brand-hover violet:hocus:text-brand-secondary'>
                  <use xlinkHref={`/assets/icons.svg#icon-trash-btn`}></use>
                </svg>
                <div className=' h-[61px] w-1.5 rounded-l-lg bg-brand violet:bg-white '></div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
