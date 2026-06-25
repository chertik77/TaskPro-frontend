import type { EditTaskData } from '../model/types'

import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/shared/ui'

import { EditTaskDialogTrigger } from './EditTaskDialogTrigger'
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
      <EditTaskDialogTrigger />
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
