import type { Board } from 'types/board.types'

import { useModal } from 'react-modal-state'

import { useDeleteBoard } from 'hooks/board/useDeleteBoard'

export const SidebarListActiveItem = ({ board }: { board: Board }) => {
  const { open } = useModal('edit-board-modal')

  const { mutate } = useDeleteBoard()

  const handleEdit = () => {
    open({ title: board.title, icon: board.icon })
  }

  return (
    <div className='flex gap-5'>
    <div className='flex items-center gap-2'>
      <button onClick={handleEdit}>
        <svg
          className='size-4 stroke-black opacity-50 transition duration-300 ease-in-out
            aria-[current=page]:bg-brand hocus:stroke-brand violet:stroke-white-primary
            violet:hocus:stroke-white dark:stroke-white-primary dark:hocus:stroke-brand'>
          <use xlinkHref={`/assets/icons.svg#icon-pencil-btn`}></use>
        </svg>
      </button>
      <button onClick={() => mutate()}>
        <svg
          className='size-4 stroke-black opacity-50 transition duration-300 ease-in-out
            aria-[current=page]:bg-brand hocus:stroke-brand violet:stroke-white-primary
            violet:hocus:stroke-white dark:stroke-white-primary dark:hocus:stroke-brand'>
          <use xlinkHref={`/assets/icons.svg#icon-trash-btn`}></use>
        </svg>
      </button>
      </div>
      <div className='h-[61px] w-[4px] rounded-l-lg bg-brand violet:bg-white'></div>
    </div>
  )
}
