import type { InferOutput } from 'valibot'
import type { ColumnSchema, EditColumnModalSchema } from './column.contracts'

export type ColumnSchema = InferOutput<typeof ColumnSchema>
export type EditColumnModalSchema = InferOutput<typeof EditColumnModalSchema>
