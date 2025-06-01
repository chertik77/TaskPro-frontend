import type { InferOutput } from 'valibot'
import type { ColumnSchema, ColumnsSchema } from './column.contracts'

export type ColumnSchema = InferOutput<typeof ColumnSchema>
export type ColumnsSchema = InferOutput<typeof ColumnsSchema>

export type EditColumnDialogProps = Pick<ColumnSchema, 'title' | 'id'>
