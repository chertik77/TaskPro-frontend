import * as v from 'valibot'

import { ICONS } from '@/shared/constants'

export const EditBoardSchema = v.partial(
  v.object({
    title: v.pipe(
      v.string(),
      v.trim(),
      v.minLength(3, 'Please enter at least 3 characters.')
    ),
    icon: v.picklist(ICONS),
    background: v.string()
  })
)

export type EditBoardSchema = v.InferOutput<typeof EditBoardSchema>
