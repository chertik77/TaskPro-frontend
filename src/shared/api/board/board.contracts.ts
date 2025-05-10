import * as v from 'valibot'

import { ICONS } from '@/shared/constants'

import { ColumnDtoSchema } from '../column/column.contracts'

export const BoardDtoSchema = v.object({
  id: v.string(),
  title: v.string(),
  icon: v.picklist(ICONS),
  background: v.object({
    identifier: v.string(),
    url: v.nullable(v.string())
  }),
  columns: v.undefinedable(v.array(ColumnDtoSchema))
})

export const BoardsDtoSchema = v.array(v.omit(BoardDtoSchema, ['columns']))

export const BoardIdDtoSchema = v.object({
  boardId: v.string()
})

export const AddBoardDtoSchema = v.object({
  title: v.pipe(v.string(), v.trim(), v.minLength(3)),
  icon: v.picklist(ICONS),
  background: v.string()
})

export const EditBoardDtoSchema = v.intersect([
  v.partial(AddBoardDtoSchema),
  BoardIdDtoSchema
])
