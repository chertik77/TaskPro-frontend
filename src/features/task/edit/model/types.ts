import type { Task } from '@/shared/api'

type EditTaskFormValues = Omit<Task, 'id' | 'columnId' | 'order'>

export type EditTaskData = {
  taskId: string
  formValues: EditTaskFormValues
}
