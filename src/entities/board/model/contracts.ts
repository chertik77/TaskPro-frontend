import * as v from 'valibot'

import { ColumnSchema } from '../../column/@x/board'
import { ICONS } from '../config/icon.constants'

export const BoardSchema = v.object({
  id: v.string(),
  title: v.string(),
  icon: v.picklist(ICONS),
  background: v.object({
    identifier: v.string(),
    url: v.nullable(v.string())
  }),
  columns: v.array(ColumnSchema)
})

export const BoardsSchema = v.array(v.omit(BoardSchema, ['columns']))
