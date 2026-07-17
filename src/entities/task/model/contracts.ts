import * as v from 'valibot'

import { vTaskPriority } from '@/shared/api'

import { TASK_DEADLINES } from '../config/deadline'

export const TaskSearchSchema = v.object({
  priority: v.optional(vTaskPriority),
  deadline: v.optional(v.picklist(TASK_DEADLINES)),
  search: v.optional(v.pipe(v.string(), v.trim()), '')
})
