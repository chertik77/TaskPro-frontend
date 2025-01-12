import * as v from 'valibot'

import { TitleSchema } from '../shared/schema'
import { ICONS } from './board.constants'

export const BoardSchema = v.object({
  ...TitleSchema.entries,
  icon: v.picklist(ICONS),
  background: v.string()
})

export type BoardSchema = v.InferInput<typeof BoardSchema>
