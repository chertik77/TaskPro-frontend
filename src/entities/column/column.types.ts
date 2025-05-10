import type { InferOutput } from 'valibot'
import type {
  ColumnSchema,
  ColumnsSchema,
  EditColumnModalSchema
} from './column.contracts'

export type ColumnSchema = InferOutput<typeof ColumnSchema>
export type ColumnsSchema = InferOutput<typeof ColumnsSchema>
export type EditColumnModalSchema = InferOutput<typeof EditColumnModalSchema>
