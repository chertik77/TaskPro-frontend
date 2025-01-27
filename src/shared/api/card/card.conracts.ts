import * as v from 'valibot'

import { DEADLINES, PRIORITIES } from '@/shared/constants'

export const CardSchema = v.object({
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

export const CardSearchSchema = v.object({
  priority: v.optional(v.picklist(PRIORITIES)),
  deadline: v.optional(v.picklist(DEADLINES))
})
