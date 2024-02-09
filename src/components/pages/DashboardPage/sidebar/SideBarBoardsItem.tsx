import { cn } from 'lib/utils'
import { NavLink } from 'react-router-dom'
import { Board } from 'redux/slices/board/board-types'

export const SideBarBoardsItem = ({ board }: { board: Board }) => {
  // const { open } = useModal('edit-board-modal')

  return (
    <li
      className={cn(
        'flex h-[61px] w-full cursor-pointer items-center gap-2 text-white/50'
        // {
        //   'rounded-l border-r-4 border-brand bg-black-third': isActiveItem
        // }
      )}>
      <NavLink to={`/dashboard/:${board.title}`}>
        <svg className='size-[18px] stroke-current aria-[current=page]:bg-brand'>
          <use xlinkHref={`/assets/icons.svg#${board.icon}`}></use>
        </svg>
        {board?.title}
      </NavLink>
      {/* {isActiveItem && <button className='bg-brand'>Create</button>} */}
    </li>
  )
}
