import * as v from 'valibot'

import { DEADLINES, PRIORITIES } from '../shared/constants'
import { TitleSchema } from '../shared/schema'

export const CardSchema = v.object({
  ...TitleSchema.entries,
  description: TitleSchema.entries.title,
  priority: v.picklist(PRIORITIES),
  deadline: v.date()
})

export const CardSearchSchema = v.object({
  priority: v.optional(v.picklist(PRIORITIES)),
  deadline: v.optional(v.picklist(DEADLINES))
})

export type CardSchema = v.InferInput<typeof CardSchema>
