import type { TaskTypes } from '@/entities/task'

export type EditTaskFormValues = Omit<
  TaskTypes.TaskSchema,
  'id' | 'columnId' | 'order'
>

export type EditTaskData = {
  taskId: string
  formValues: EditTaskFormValues
}
