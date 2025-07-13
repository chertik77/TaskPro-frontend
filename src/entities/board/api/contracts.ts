import * as v from 'valibot'

import { ColumnDtoSchema } from '@/entities/column/@x/board'

import { BOARD_BG_IMAGES_IDS } from '../config/bg-images'
import { BOARD_ICONS } from '../config/icon'

export const BoardDtoSchema = v.object({
  id: v.string(),
  title: v.string(),
  icon: v.picklist(BOARD_ICONS),
  background: v.object({
    identifier: v.picklist(BOARD_BG_IMAGES_IDS),
    url: v.nullable(v.string())
  }),
  columns: v.optional(v.array(ColumnDtoSchema))
})

export const BoardsDtoSchema = v.array(v.omit(BoardDtoSchema, ['columns']))

export const BoardIdDtoSchema = v.object({
  boardId: v.string()
})

export const AddBoardDtoSchema = v.object({
  title: v.pipe(v.string(), v.trim(), v.minLength(3)),
  icon: v.fallback(v.picklist(BOARD_ICONS), 'project'),
  background: v.fallback(v.picklist(BOARD_BG_IMAGES_IDS), 'default')
})

export const EditBoardDtoSchema = v.intersect([
  v.partial(AddBoardDtoSchema),
  BoardIdDtoSchema
])
