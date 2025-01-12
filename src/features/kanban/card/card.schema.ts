import * as v from 'valibot'

import { PRIORITIES } from '../shared/constants'
import { TitleSchema } from '../shared/schema'

export const CardSchema = v.object({
  ...TitleSchema.entries,
  description: TitleSchema.entries.title,
  priority: v.picklist(PRIORITIES),
  deadline: v.date()
})

export type CardSchema = v.InferInput<typeof CardSchema>
