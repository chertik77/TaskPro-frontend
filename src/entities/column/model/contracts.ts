import * as v from 'valibot'

import { TasksSchema } from '@/entities/task/@x/column'

export const ColumnSchema = v.object({
  id: v.string(),
  title: v.string(),
  order: v.number(),
  boardId: v.string(),
  tasks: TasksSchema
})

export const ColumnsSchema = v.array(ColumnSchema)
