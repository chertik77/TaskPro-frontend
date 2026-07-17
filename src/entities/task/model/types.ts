import type { InferOutput } from 'valibot'
import type { TaskSearchSchema } from './contracts'

export type TaskSearchSchema = InferOutput<typeof TaskSearchSchema>
