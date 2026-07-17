import { startOfDay } from 'date-fns'
import * as v from 'valibot'

import { vTaskPriority } from '@/shared/api'

export const AddTaskSchema = v.object({
  title: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(3, 'Please enter at least 3 characters.')
  ),
  description: v.union([
    v.pipe(
      v.literal(''),
      v.transform(() => undefined)
    ),
    v.pipe(
      v.string(),
      v.trim(),
      v.minLength(3, 'Please enter at least 3 characters.')
    )
  ]),
  priority: v.fallback(vTaskPriority, 'without'),
  labels: v.optional(v.array(v.string())),
  deadline: v.optional(
    v.pipe(
      v.date(),
      v.check(
        d => startOfDay(d) >= startOfDay(new Date()),
        'Deadline must be today or in the future.'
      ),
      v.transform(v => v.toISOString())
    )
  )
})

export type AddTaskSchema = v.InferOutput<typeof AddTaskSchema>
