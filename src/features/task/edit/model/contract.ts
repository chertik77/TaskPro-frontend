import * as v from 'valibot'

import { TASK_PRIORITIES } from '@/entities/task'

export const EditTaskSchema = v.object({
  title: v.optional(
    v.pipe(
      v.string(),
      v.trim(),
      v.minLength(3, 'Please enter at least 3 characters.')
    )
  ),
  description: v.union([
    v.pipe(
      v.literal(''),
      v.transform(() => null)
    ),
    v.pipe(
      v.string(),
      v.trim(),
      v.minLength(3, 'Please enter at least 3 characters.')
    )
  ]),
  priority: v.optional(v.picklist(TASK_PRIORITIES)),
  labels: v.optional(v.array(v.string())),
  deadline: v.pipe(
    v.nullish(v.date()),
    v.transform(v => v ?? null)
  )
})

export type EditTaskSchema = v.InferOutput<typeof EditTaskSchema>
