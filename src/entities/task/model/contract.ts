import * as v from 'valibot'

import { vTaskPriority } from '@/shared/api'

import { TASK_DEADLINES } from '../config/deadline'
import { TASK_SORT_DIRECTIONS, TASK_SORT_FIELDS } from '../config/filters'

export const TaskSearchSchema = v.object({
  search: v.optional(v.pipe(v.string(), v.trim()), ''),
  priority: v.optional(v.fallback(v.array(vTaskPriority), []), []),
  deadline: v.optional(v.fallback(v.array(v.picklist(TASK_DEADLINES)), []), []),
  labels: v.optional(v.fallback(v.array(v.string()), []), []),
  sort: v.optional(
    v.fallback(v.picklist(TASK_SORT_FIELDS), 'manual'),
    'manual'
  ),
  dir: v.optional(v.fallback(v.picklist(TASK_SORT_DIRECTIONS), 'asc'), 'asc')
})
