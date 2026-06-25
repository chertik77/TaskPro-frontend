import * as v from 'valibot'

import { TASK_PRIORITIES } from '../config/priority'

export const TaskDtoSchema = v.object({
  id: v.string(),
  title: v.string(),
  description: v.string(),
  order: v.number(),
  columnId: v.string(),
  priority: v.picklist(TASK_PRIORITIES),
  deadline: v.pipe(
    v.string(),
    v.transform(d => new Date(d))
  )
})

export const TaskIdDtoSchema = v.object({
  taskId: v.string()
})

export const AddTaskDtoSchema = v.object({
  columnId: v.string(),
  title: v.pipe(v.string(), v.trim(), v.minLength(3)),
  description: v.pipe(v.string(), v.trim(), v.minLength(3)),
  priority: v.picklist(TASK_PRIORITIES),
  deadline: v.date()
})

export const EditTaskDtoSchema = v.intersect([
  v.partial(AddTaskDtoSchema),
  TaskIdDtoSchema
])

export const UpdateTaskOrderDtoSchema = v.object({
  columnId: v.string(),
  ids: v.array(v.string())
})
