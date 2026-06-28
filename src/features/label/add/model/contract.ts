import * as v from 'valibot'

import { LABEL_COLORS } from '@/entities/label'

export const AddLabelSchema = v.object({
  name: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(2, 'Please enter at least 2 characters.')
  ),
  color: v.fallback(v.picklist(LABEL_COLORS), 'blue')
})

export type AddLabelSchema = v.InferOutput<typeof AddLabelSchema>
