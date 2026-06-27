import { Task } from '@/entities/task'

import { DialogTrigger, Icon } from '@/shared/ui'

export const EditTaskDialogTrigger = () => (
  <DialogTrigger
    render={
      <Task.ActionButton aria-label='Edit task'>
        <Icon name='pencil' />
      </Task.ActionButton>
    }
  />
)
