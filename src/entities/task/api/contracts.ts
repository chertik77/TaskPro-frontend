import * as v from 'valibot'

import { LabelSchema } from '@/entities/label/@x/task'

import { TASK_PRIORITIES } from '../config/priority'

export const TaskDtoSchema = v.object({
  id: v.string(),
  title: v.string(),
  description: v.nullable(v.string()),
  order: v.number(),
  columnId: v.string(),
  priority: v.picklist(TASK_PRIORITIES),
  labels: v.optional(v.array(LabelSchema)),
  deadline: v.nullable(
    v.pipe(
      v.string(),
      v.transform(d => new Date(d))
    )
  )
})

export const TaskIdDtoSchema = v.object({
  taskId: v.string()
})

export const AddTaskDtoSchema = v.object({
  columnId: v.string(),
  title: v.pipe(v.string(), v.trim(), v.minLength(3)),
  description: v.optional(v.pipe(v.string(), v.trim(), v.minLength(3))),
  priority: v.picklist(TASK_PRIORITIES),
  labels: v.optional(v.array(v.string())),
  deadline: v.optional(v.date())
})

export const EditTaskDtoSchema = v.intersect([
  v.partial(
    v.object({
      ...AddTaskDtoSchema.entries,
      description: v.nullable(v.pipe(v.string(), v.trim(), v.minLength(3))),
      deadline: v.nullable(v.date())
    })
  ),
  TaskIdDtoSchema
])

export const UpdateTaskOrderDtoSchema = v.object({
  columnId: v.string(),
  ids: v.array(v.string())
})
