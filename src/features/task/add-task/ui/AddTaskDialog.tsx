import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/shared/ui'

import { AddTaskDialogTrigger } from './AddTaskDialogTrigger'
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
      <AddTaskDialogTrigger />
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
