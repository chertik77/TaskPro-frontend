import * as v from 'valibot'

import { priorities } from 'constants/priorities'

import { TitleSchema } from './base.schema'

export const CardSchema = v.object({
  ...TitleSchema.entries,
  description: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(3, 'Please enter at least 3 characters.')
  ),
  priority: v.picklist(priorities),
  deadline: v.date()
})

export type CardSchema = v.InferOutput<typeof CardSchema>
