import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  PlusButtonWithLoader
} from '@/shared/ui'

import { AddTaskForm } from './AddTaskForm'

type AddTaskDialogProps = {
  columnId: string
}

export const AddTaskDialog = ({ columnId }: AddTaskDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        render={
          <PlusButtonWithLoader
            aria-label='Add task'
            className='mt-3.5'>
            Add task
          </PlusButtonWithLoader>
        }
      />
      <DialogContent>
        <DialogTitle>Add task</DialogTitle>
        <DialogDescription className='sr-only'>
          You can add a new task here by adding a title, description, priority
          and deadline.
        </DialogDescription>
        <AddTaskForm
          columnId={columnId}
          setIsDialogOpen={setIsDialogOpen}
        />
      </DialogContent>
    </Dialog>
  )
}
