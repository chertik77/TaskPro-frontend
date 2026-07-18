import { PlusIcon } from 'lucide-react'

import { AddBoardDialog } from '@/features/board/add'

import { DialogTrigger } from '@/shared/ui'

export const SidebarBoardCreationSection = () => (
  <div className='tablet:px-6 mb-10 px-3.5'>
    <p className='text-md mb-2 text-black/50 dark:text-white/50'>My boards</p>
    <span
      className='flex items-center justify-between border-y border-black/10
        py-3.5 dark:border-white/10'>
      <p className='w-19'>Create a new board</p>
      <AddBoardDialog>
        <DialogTrigger
          className='focus-visible:styled-outline bg-accent hocus:bg-accent/50
            flex h-9 w-10 items-center justify-center rounded-lg text-black
            transition-colors'>
          <PlusIcon className='size-5' />
        </DialogTrigger>
      </AddBoardDialog>
    </span>
  </div>
)
