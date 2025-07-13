import * as v from 'valibot'

import { ColumnSchema } from '@/entities/column/@x/board'

import { BOARD_BG_IMAGES_IDS } from '../config/bg-images'
import { BOARD_ICONS } from '../config/icon'

export const BoardSchema = v.object({
  id: v.string(),
  title: v.string(),
  icon: v.picklist(BOARD_ICONS),
  background: v.object({
    identifier: v.picklist(BOARD_BG_IMAGES_IDS),
    url: v.nullable(v.string())
  }),
  columns: v.array(ColumnSchema)
})

export const BoardsSchema = v.array(v.omit(BoardSchema, ['columns']))
