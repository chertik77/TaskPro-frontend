import * as v from 'valibot'

import { priorities } from 'constants/priorities'

import { TitleSchema } from './board.schema'

export const CardSchema = v.object({
  ...TitleSchema.entries,
  description: v.string([
    v.toTrimmed(),
    v.minLength(3, 'Please enter at least 3 characters.')
  ]),
  priority: v.picklist(priorities),
  deadline: v.date()
})

export type CardSchema = v.Output<typeof CardSchema>
