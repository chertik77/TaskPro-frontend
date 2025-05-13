import { AddBoardModalTrigger } from '@/features/board/add-board'

export const EmptyBoard = () => (
  <div className='flex items-center justify-center'>
    <div
      className='text-md dark:text-white-gray tablet:w-[486px] tablet:text-base w-84 text-center
        text-black/70'>
      Before starting your project, it is essential{' '}
      <AddBoardModalTrigger
        className='focus-visible:styled-outline text-brand violet:text-brand-violet
          hocus:text-brand-light violet:hocus:text-brand-violet-muted transition-colors'>
        to create a board
      </AddBoardModalTrigger>{' '}
      to visualize and track all the necessary tasks and milestones. This board
      serves as a powerful tool to organize the workflow and ensure effective
      collaboration among team members.
    </div>
  </div>
)
