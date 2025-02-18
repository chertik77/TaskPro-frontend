import { AddBoardModalTrigger } from '@/features/board/add-board'

export const SidebarBoardInfo = () => (
  <div className='mb-10 px-3.5 tablet:px-6'>
    <p
      className='mb-2 overflow-hidden text-sm text-black/50 violet:text-white/50
        dark:text-white/50'>
      My boards
    </p>
    <div
      className='flex items-center justify-between border-y border-black/10 py-3.5
        violet:border-white/10 dark:border-white/10'>
      <p className='w-[76px] violet:text-white'>Create a new board</p>
      <AddBoardModalTrigger />
    </div>
  </div>
)
