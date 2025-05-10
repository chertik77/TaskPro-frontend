import * as v from 'valibot'

import { PRIORITIES } from '@/shared/constants'

import { ColumnIdDtoSchema } from '../column/contracts'

export const CardDtoSchema = v.object({
  id: v.string(),
  title: v.string(),
  description: v.string(),
  order: v.number(),
  columnId: v.string(),
  priority: v.picklist(PRIORITIES),
  //TODO: add correct date types
  deadline: v.string()
})

export const CardIdDtoSchema = v.object({
  cardId: v.string()
})

export const AddCardDtoSchema = v.object({
  columnId: v.lazy(() => ColumnIdDtoSchema.entries.columnId),
  title: v.pipe(v.string(), v.trim(), v.minLength(3)),
  description: v.pipe(v.string(), v.trim(), v.minLength(3)),
  priority: CardDtoSchema.entries.priority,
  deadline: v.date()
})

export const EditCardDtoSchema = v.intersect([
  v.partial(AddCardDtoSchema),
  CardIdDtoSchema
])

export const UpdateCardOrderDtoSchema = v.object({
  columnId: v.lazy(() => ColumnIdDtoSchema.entries.columnId),
  ids: v.array(v.string())
})
