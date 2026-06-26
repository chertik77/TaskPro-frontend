import * as v from 'valibot'

import { LabelsSchema } from '@/entities/label/@x/task'

import { TASK_DEADLINES } from '../config/deadline'
import { TASK_PRIORITIES } from '../config/priority'

export const TaskSchema = v.object({
  id: v.string(),
  title: v.string(),
  order: v.number(),
  columnId: v.string(),
  description: v.string(),
  priority: v.picklist(TASK_PRIORITIES),
  labels: v.optional(LabelsSchema),
  deadline: v.date()
})

export const TasksSchema = v.array(TaskSchema)

export const TaskSearchSchema = v.object({
  priority: v.optional(v.picklist(TASK_PRIORITIES)),
  deadline: v.optional(v.picklist(TASK_DEADLINES)),
  search: v.optional(v.pipe(v.string(), v.trim()), '')
})
