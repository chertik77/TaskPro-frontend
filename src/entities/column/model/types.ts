import type { InferOutput } from 'valibot'
import type { ColumnSchema, ColumnsSchema } from './contracts'

export type ColumnSchema = InferOutput<typeof ColumnSchema>
export type ColumnsSchema = InferOutput<typeof ColumnsSchema>
