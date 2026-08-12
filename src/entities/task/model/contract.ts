import * as v from 'valibot'

import { vTaskPriority } from '@/shared/api'

import { TASK_DEADLINES } from '../config/deadline'

export const TaskSearchSchema = v.object({
  search: v.optional(v.pipe(v.string(), v.trim()), ''),
  priority: v.optional(v.fallback(v.array(vTaskPriority), []), []),
  deadline: v.optional(v.fallback(v.array(v.picklist(TASK_DEADLINES)), []), []),
  labels: v.optional(v.fallback(v.array(v.string()), []), [])
})
