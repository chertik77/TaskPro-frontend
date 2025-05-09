import * as v from 'valibot'

import { BoardIdDtoSchema } from '../board/contracts'
import { CardDtoSchema } from '../card/contracts'

export const ColumnDtoSchema = v.object({
  id: v.string(),
  title: v.string(),
  order: v.number(),
  boardId: v.string(),
  cards: v.array(CardDtoSchema)
})

export const ColumnIdDtoSchema = v.object({
  columnId: v.string()
})

export const AddColumnDtoSchema = v.object({
  title: v.pipe(v.string(), v.trim(), v.minLength(3)),
  boardId: v.lazy(() => BoardIdDtoSchema.entries.boardId)
})

export const EditColumnDtoSchema = v.intersect([
  v.partial(AddColumnDtoSchema),
  ColumnIdDtoSchema
])

export const UpdateColumnDtoSchema = v.object({
  boardId: v.lazy(() => BoardIdDtoSchema.entries.boardId),
  ids: v.array(v.string())
})
