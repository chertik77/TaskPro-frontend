import * as v from 'valibot'

import { ICONS } from '@/shared/constants'

import { ColumnSchema } from '../column/@x/board'

export const BoardSchema = v.object({
  id: v.string(),
  title: v.string(),
  icon: v.picklist(ICONS),
  background: v.object({
    identifier: v.string(),
    url: v.nullable(v.string())
  }),
  columns: v.undefinedable(v.array(ColumnSchema))
})

export const BoardsSchema = v.array(v.omit(BoardSchema, ['columns']))

export const EditBoardModalSchema = v.object({
  title: v.string(),
  icon: v.picklist(ICONS),
  background: v.string()
})
