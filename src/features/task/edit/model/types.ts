import type { Task } from '@/shared/api'

export type EditTaskFormValues = Omit<Task, 'id' | 'columnId' | 'order'>

export type EditTaskData = {
  taskId: string
  formValues: EditTaskFormValues
}
