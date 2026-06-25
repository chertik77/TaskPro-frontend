import { startOfDay } from 'date-fns'
import * as v from 'valibot'

import { TASK_PRIORITIES } from '@/entities/task'

export const AddTaskSchema = v.object({
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
  priority: v.fallback(v.picklist(TASK_PRIORITIES), 'Without'),
  deadline: v.pipe(
    v.date(),
    v.check(
      d => startOfDay(d) >= startOfDay(new Date()),
      'Deadline must be today or in the future.'
    )
  )
})

export type AddTaskSchema = v.InferOutput<typeof AddTaskSchema>
