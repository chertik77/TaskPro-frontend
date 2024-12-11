import { priorities } from 'features/user/model/constants'
import * as v from 'valibot'

import { TitleSchema } from './board.schema'

export const CardSchema = v.object({
  ...TitleSchema.entries,
  description: TitleSchema.entries.title,
  priority: v.picklist(priorities),
  deadline: v.date()
})

export type CardSchema = v.Output<typeof CardSchema>
