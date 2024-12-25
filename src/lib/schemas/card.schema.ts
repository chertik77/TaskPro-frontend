import * as v from 'valibot'

import { priorities } from 'constants/priorities'

import { TitleSchema } from './board.schema'

export const CardSchema = v.object({
  ...TitleSchema.entries,
  description: TitleSchema.entries.title,
  priority: v.picklist(priorities),
  deadline: v.date()
})

export type CardSchema = v.Output<typeof CardSchema>
