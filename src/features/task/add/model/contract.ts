import * as v from 'valibot'

import { serializeDeadline } from '@/entities/task'

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
  deadline: v.pipe(
    v.nullish(v.date()),
    v.transform(d => (d ? serializeDeadline(d) : undefined))
  )
})

export type AddTaskSchema = v.InferOutput<typeof AddTaskSchema>
