import * as v from 'valibot'

import { LABEL_COLORS } from '@/entities/label'
import { TASK_PRIORITIES } from '@/entities/task'

export const AddLabelSchema = v.object({
  name: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(3, 'Please enter at least 3 characters.')
  ),
  priority: v.fallback(v.picklist(TASK_PRIORITIES), 'Without'),
  color: v.picklist(LABEL_COLORS)
})

export type AddLabelSchema = v.InferOutput<typeof AddLabelSchema>
