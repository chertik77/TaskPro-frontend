import { useModal } from 'react-modal-state'

import { NewBoardModal } from './modals'

export const EmptyBoard = () => {
  const { open: openNewBoardModal } = useModal(NewBoardModal)

  return (
    <div className='flex items-center justify-center'>
      <div
        className='w-8xl text-center text-sm text-black/70 dark:text-white-gray-secondary
          tablet:w-[486px] tablet:text-base'>
        Before starting your project, it is essential{' '}
        <button
          onClick={openNewBoardModal}
          className='focus-visible:styled-outline text-brand hocus:text-brand-hover
            violet:text-brand-secondary violet:hocus:text-brand-third'>
          to create a board
        </button>{' '}
        to visualize and track all the necessary tasks and milestones. This
        board serves as a powerful tool to organize the workflow and ensure
        effective collaboration among team members.
      </div>
    </div>
  )
}
