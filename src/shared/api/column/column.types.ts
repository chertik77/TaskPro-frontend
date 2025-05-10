import type { InferOutput } from 'valibot'
import type {
  AddColumnDtoSchema,
  ColumnDtoSchema,
  ColumnIdDtoSchema,
  EditColumnDtoSchema,
  UpdateColumnDtoSchema
} from './column.contracts'

export type ColumnDto = InferOutput<typeof ColumnDtoSchema>
export type ColumnIdDto = InferOutput<typeof ColumnIdDtoSchema>
export type AddColumnDto = InferOutput<typeof AddColumnDtoSchema>
export type EditColumnDto = InferOutput<typeof EditColumnDtoSchema>
export type UpdateColumnDto = InferOutput<typeof UpdateColumnDtoSchema>
