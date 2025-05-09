import * as v from 'valibot'

import { CardSchema } from '../card/@x/column'

export const ColumnSchema = v.object({
  id: v.string(),
  title: v.string(),
  order: v.number(),
  boardId: v.string(),
  cards: v.array(CardSchema)
})

export const EditColumnModalSchema = v.pick(ColumnSchema, ['title', 'id'])
