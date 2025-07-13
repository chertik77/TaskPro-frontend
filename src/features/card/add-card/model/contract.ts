import * as v from 'valibot'

import { CARD_PRIORITIES } from '@/entities/card'

export const AddCardSchema = v.object({
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
  priority: v.fallback(v.picklist(CARD_PRIORITIES), 'Without'),
  deadline: v.fallback(v.date(), () => new Date())
})

export type AddCardSchema = v.InferOutput<typeof AddCardSchema>
