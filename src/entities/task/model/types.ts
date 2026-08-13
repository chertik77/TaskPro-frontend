import type { InferOutput } from 'valibot'
import type { TaskSearchSchema } from './contract'

export type TaskSearchSchema = InferOutput<typeof TaskSearchSchema>

export type TaskFilterKey = keyof TaskSearchSchema

export type TaskArrayFilterKey = {
  [K in TaskFilterKey]: TaskSearchSchema[K] extends readonly unknown[]
    ? K
    : never
}[TaskFilterKey]
