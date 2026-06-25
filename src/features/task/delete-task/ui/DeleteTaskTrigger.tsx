import { Task } from '@/entities/task'

import { Icon } from '@/shared/ui'

import { useDeleteTask } from '../api/useDeleteTask'

export const DeleteTaskTrigger = ({ taskId }: { taskId: string }) => {
  const { mutate: deleteTask } = useDeleteTask()

  return (
    <Task.ActionButton
      onClick={() => deleteTask({ taskId })}
      aria-label='Delete task'>
      <Icon name='trash' />
    </Task.ActionButton>
  )
}
