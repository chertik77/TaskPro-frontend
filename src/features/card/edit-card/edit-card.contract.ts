import * as v from 'valibot'

import { PRIORITIES } from '@/shared/constants'

export const EditCardSchema = v.partial(
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
    priority: v.picklist(PRIORITIES),
    deadline: v.date()
  })
)

export type EditCardSchema = v.InferInput<typeof EditCardSchema>
