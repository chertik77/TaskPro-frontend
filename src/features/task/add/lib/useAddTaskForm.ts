import { useSettings } from '@/entities/setting'

import { useAppForm } from '@/shared/lib'

import { AddTaskSchema } from '../model/contract'
import { resolveDefaultDeadline } from './default-deadline-map'

export const useAddTaskForm = () => {
  const { data: taskSettings } = useSettings(select => select.task)

  return useAppForm(AddTaskSchema, {
    defaultValues: {
      title: '',
      description: '',
      priority: taskSettings?.defaultPriority ?? 'without',
      deadline: resolveDefaultDeadline(taskSettings?.defaultDeadline),
      labels: []
    }
  })
}
