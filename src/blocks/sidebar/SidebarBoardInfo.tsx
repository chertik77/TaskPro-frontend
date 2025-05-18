import { AddBoardDialog } from '@/features/board/add-board'

import { DialogTrigger, Icon } from '@/shared/ui'

export const SidebarBoardInfo = () => (
  <div className='tablet:px-6 mb-10 px-3.5'>
    <p
      className='text-md violet:text-white/50 mb-2 overflow-hidden text-black/50
        dark:text-white/50'>
      My boards
    </p>
    <span
      className='violet:border-white/10 flex items-center justify-between border-y
        border-black/10 py-3.5 dark:border-white/10'>
      <p className='violet:text-white w-[76px]'>Create a new board</p>
      <AddBoardDialog>
        <DialogTrigger
          className='focus-visible:styled-outline bg-brand violet:bg-brand-violet-soft
            violet:text-white hocus:bg-brand-light violet:hocus:bg-brand-violet-muted flex
            h-9 w-10 items-center justify-center rounded-lg text-black transition-all
            duration-300'>
          <Icon name='plus' />
        </DialogTrigger>
      </AddBoardDialog>
    </span>
  </div>
)
