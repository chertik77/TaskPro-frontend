import { Task } from '@/entities/task'

import { DialogTrigger, Icon } from '@/shared/ui'

export const EditTaskDialogTrigger = () => (
  <DialogTrigger asChild>
    <Task.ActionButton aria-label='Edit task'>
      <Icon name='pencil' />
    </Task.ActionButton>
  </DialogTrigger>
)
