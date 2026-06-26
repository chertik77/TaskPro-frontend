import * as v from 'valibot'

import { TASK_PRIORITIES } from '@/entities/task'

export const EditTaskSchema = v.partial(
  v.object({
    title: v.pipe(
      v.string(),
      v.trim(),
      v.minLength(3, 'Please enter at least 3 characters.')
    ),
    description: v.pipe(
      v.string(),
      v.trim(),
      v.minLength(3, 'Please enter at least 3 characters.')
    ),
    priority: v.picklist(TASK_PRIORITIES),
    labels: v.array(v.string()),
    deadline: v.date()
  })
)

export type EditTaskSchema = v.InferOutput<typeof EditTaskSchema>
