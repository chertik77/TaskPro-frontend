import * as v from 'valibot'

import { vBoardBackgroundId, vBoardIcon } from '@/shared/api'

export const AddBoardSchema = v.object({
  title: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(3, 'Please enter at least 3 characters.')
  ),
  icon: v.fallback(vBoardIcon, 'sparkles'),
  background: v.fallback(vBoardBackgroundId, 'default')
})

export type AddBoardSchema = v.InferOutput<typeof AddBoardSchema>
