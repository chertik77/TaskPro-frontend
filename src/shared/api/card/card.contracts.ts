import * as v from 'valibot'

import { PRIORITIES } from '@/shared/constants'

export const CardDtoSchema = v.object({
  id: v.string(),
  title: v.string(),
  description: v.string(),
  order: v.number(),
  columnId: v.string(),
  priority: v.picklist(PRIORITIES),
  deadline: v.pipe(
    v.string(),
    v.transform(d => new Date(d))
  )
})

export const CardIdDtoSchema = v.object({
  cardId: v.string()
})

export const AddCardDtoSchema = v.object({
  columnId: v.string(),
  title: v.pipe(v.string(), v.trim(), v.minLength(3)),
  description: v.pipe(v.string(), v.trim(), v.minLength(3)),
  priority: v.picklist(PRIORITIES),
  deadline: v.date()
})

export const EditCardDtoSchema = v.intersect([
  v.partial(AddCardDtoSchema),
  CardIdDtoSchema
])

export const MoveCardDtoSchema = v.object({
  cardId: v.string(),
  newColumnId: v.string()
})

export const UpdateCardOrderDtoSchema = v.object({
  columnId: v.string(),
  ids: v.array(v.string())
})
