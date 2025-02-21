import { useModal } from 'react-modal-state'

import { AddBoardModalTrigger } from '@/features/board/add-board'

export const EmptyBoard = () => {
  const { open: openNewBoardModal } = useModal(AddBoardModalTrigger)

  return (
    <div className='flex items-center justify-center'>
      <div
        className='w-84 text-center text-md text-black/70 dark:text-white-gray tablet:w-[486px]
          tablet:text-base'>
        Before starting your project, it is essential{' '}
        <button
          onClick={openNewBoardModal}
          className='focus-visible:styled-outline text-brand violet:text-brand-violet
            hocus:text-brand-light violet:hocus:text-brand-violet-soft'>
          to create a board
        </button>{' '}
        to visualize and track all the necessary tasks and milestones. This
        board serves as a powerful tool to organize the workflow and ensure
        effective collaboration among team members.
      </div>
    </div>
  )
}
