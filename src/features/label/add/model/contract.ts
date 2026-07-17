import * as v from 'valibot'

import { vLabelColor } from '@/shared/api'

export const AddLabelSchema = v.object({
  name: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(2, 'Please enter at least 2 characters.')
  ),
  color: v.fallback(vLabelColor, 'blue')
})

export type AddLabelSchema = v.InferOutput<typeof AddLabelSchema>
