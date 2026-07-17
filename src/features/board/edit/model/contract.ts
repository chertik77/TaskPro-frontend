import * as v from 'valibot'

import { vBoardBackgroundId, vBoardIcon } from '@/shared/api'

export const EditBoardSchema = v.partial(
  v.object({
    title: v.pipe(
      v.string(),
      v.trim(),
      v.minLength(3, 'Please enter at least 3 characters.')
    ),
    icon: vBoardIcon,
    background: vBoardBackgroundId
  })
)

export type EditBoardSchema = v.InferOutput<typeof EditBoardSchema>
