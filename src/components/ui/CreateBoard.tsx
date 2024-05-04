import { useModal } from 'react-modal-state'

export const CreateBoard = () => {
  const { open } = useModal('new-board-modal')

  return (
    <div className='flex items-center justify-center mobile:h-dvh desktop:h-auto'>
      <div
        className='w-[335px] text-center text-fs-12-lh-1.33-fw-400 text-black opacity-70
          dark:text-white-gray-secondary tablet:h-[72px] tablet:w-[486px]
          tablet:text-fs-14-lh-1.28-fw-400 max-tablet:px-5'>
        Before starting your project, it is essential{' '}
        <span
          onClick={open}
          className='text-brand hocus:cursor-pointer hocus:text-brand-hover
            violet:text-brand-secondary violet:hocus:text-brand-third'>
          to create a board
        </span>
        to visualize and track all the necessary tasks and milestones. This
        board serves as a powerful tool to organize the workflow and ensure
        effective collaboration among team members.
      </div>
    </div>
  )
}
