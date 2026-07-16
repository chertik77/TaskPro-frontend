import { useState } from 'react'
import { PlusIcon } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from '@/shared/ui'

import { AddColumnForm } from './AddColumnForm'

export const AddColumnDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        aria-label='Add column'
        className='dark:bg-black-soft desktop:mr-6 focus-visible:styled-outline
          mr-5 flex h-14 w-84 items-center justify-center gap-2 rounded-lg
          bg-white -outline-offset-2 disabled:opacity-100 dark:text-white'>
        <span
          className='grid size-7 place-items-center rounded-md bg-black
            text-white dark:bg-white dark:text-black'>
          <PlusIcon className='size-4' />
        </span>
        Add column
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add column</DialogTitle>
        <DialogDescription className='sr-only'>
          You can add a new column here by adding a title.
        </DialogDescription>
        <AddColumnForm setIsDialogOpen={setIsDialogOpen} />
      </DialogContent>
    </Dialog>
  )
}
