import * as v from 'valibot'

import { TitleSchema } from '../shared/schema'
import { PRIORITIES } from './card.constants'

export const CardSchema = v.object({
  ...TitleSchema.entries,
  description: TitleSchema.entries.title,
  priority: v.picklist(PRIORITIES),
  deadline: v.date()
})

export type CardSchema = v.Output<typeof CardSchema>
