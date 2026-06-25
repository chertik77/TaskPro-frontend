import * as v from 'valibot'

import { TaskDtoSchema } from '@/entities/task/@x/column'

export const ColumnDtoSchema = v.object({
  id: v.string(),
  title: v.string(),
  order: v.number(),
  boardId: v.string(),
  tasks: v.array(TaskDtoSchema)
})

export const ColumnIdDtoSchema = v.object({
  columnId: v.string()
})

export const AddColumnDtoSchema = v.object({
  title: v.pipe(v.string(), v.trim(), v.minLength(3)),
  boardId: v.string()
})

export const EditColumnDtoSchema = v.intersect([
  v.partial(AddColumnDtoSchema),
  ColumnIdDtoSchema
])

export const UpdateColumnDtoSchema = v.object({
  boardId: v.string(),
  ids: v.array(v.string())
})
