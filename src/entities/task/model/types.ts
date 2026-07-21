import type { InferOutput } from 'valibot'
import type { TaskSearchSchema } from './contract'

export type TaskSearchSchema = InferOutput<typeof TaskSearchSchema>
