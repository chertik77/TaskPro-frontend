import type { EditTaskData } from '../model/types'

import { useState } from 'react'
import { PencilIcon } from 'lucide-react'

import { Task } from '@/entities/task'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from '@/shared/ui'

import { EditTaskForm } from './EditTaskForm'

type EditTaskDialogProps = {
  data: EditTaskData
}

export const EditTaskDialog = ({ data }: EditTaskDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        render={
          <Task.ActionButton aria-label='Edit task'>
            <PencilIcon />
          </Task.ActionButton>
        }
      />
      <DialogContent>
        <DialogTitle>Edit task</DialogTitle>
        <DialogDescription className='sr-only'>
          You can edit a task here by changing its title, description, priority
          and deadline.
        </DialogDescription>
        <EditTaskForm
          data={data}
          setIsDialogOpen={setIsDialogOpen}
        />
      </DialogContent>
    </Dialog>
  )
}
