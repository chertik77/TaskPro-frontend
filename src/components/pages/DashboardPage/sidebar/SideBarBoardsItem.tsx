import { cn } from 'lib/utils'
import { useState } from 'react'
import { useModal } from 'react-modal-state'
import { Board } from 'redux/slices/board/board-types'

export const SideBarBoardsItem = ({ board }: { board: Board }) => {
  const [isAdditionalInfoShown, setIsAdditionalShown] = useState(false)
  const { open } = useModal('edit-board-modal')

  return (
    <li
      className={cn(
        'flex h-[61px] w-full cursor-pointer items-center gap-2 text-white/50',
        {
          'rounded-l border-r-4 border-brand bg-black-third':
            isAdditionalInfoShown
        }
      )}
      onClick={() => setIsAdditionalShown(true)}>
      <svg className='size-[18px] stroke-current'>
        <use xlinkHref={`/assets/icons.svg#${board.icon}`}></use>
      </svg>
      {board?.title}
      {isAdditionalInfoShown && (
        <button className='bg-brand' onClick={open}>
          Create
        </button>
      )}
    </li>
  )
}
