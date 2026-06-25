import type { InferOutput } from 'valibot'
import type { TASK_DEADLINES } from '../config/deadline'
import type { TASK_PRIORITIES } from '../config/priority'
import type { TaskSchema, TaskSearchSchema, TasksSchema } from './contracts'

export type TaskSchema = InferOutput<typeof TaskSchema>
export type TasksSchema = InferOutput<typeof TasksSchema>
export type TaskSearchSchema = InferOutput<typeof TaskSearchSchema>
export type TaskDeadline = (typeof TASK_DEADLINES)[number]
export type TaskPriority = (typeof TASK_PRIORITIES)[number]
