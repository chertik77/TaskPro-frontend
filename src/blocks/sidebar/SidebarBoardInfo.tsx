import { AddBoardModalTrigger } from '@/features/board/add-board'

import { Icon } from '@/shared/ui'

export const SidebarBoardInfo = () => (
  <div className='mb-10 px-3.5 tablet:px-6'>
    <p
      className='mb-2 overflow-hidden text-md text-black/50 violet:text-white/50
        dark:text-white/50'>
      My boards
    </p>
    <span
      className='flex items-center justify-between border-y border-black/10 py-3.5
        violet:border-white/10 dark:border-white/10'>
      <p className='w-[76px] violet:text-white'>Create a new board</p>
      <AddBoardModalTrigger
        className='focus-visible:styled-outline flex h-9 w-10 items-center justify-center
          rounded-lg bg-brand text-black transition-all duration-300
          violet:bg-brand-violet-soft violet:text-white hocus:bg-brand-light
          violet:hocus:bg-brand-violet-muted'>
        <Icon name='plus' />
      </AddBoardModalTrigger>
    </span>
  </div>
)
