import * as v from 'valibot'

import { TitleSchema } from './board.schema'

export const CardSchema = v.object({
  ...TitleSchema.entries,
  description: v.string([
    v.toTrimmed(),
    v.minLength(3, 'Please enter at least 3 characters.')
  ]),
  priority: v.picklist(['Low', 'Medium', 'High', 'Without priority']),
  deadline: v.date()
})

export type CardSchema = v.Output<typeof CardSchema>
