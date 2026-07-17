import * as v from 'valibot'

import { vAccentColor } from '@/shared/api'

export const AddLabelSchema = v.object({
  name: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(2, 'Please enter at least 2 characters.')
  ),
  color: v.fallback(vAccentColor, 'blue')
})

export type AddLabelSchema = v.InferOutput<typeof AddLabelSchema>
