import type { InferInput } from 'valibot'
import type {
  AddColumnDtoSchema,
  ColumnDtoSchema,
  ColumnIdDtoSchema,
  EditColumnDtoSchema,
  UpdateColumnDtoSchema
} from './contracts'

export type ColumnDto = InferInput<typeof ColumnDtoSchema>
export type ColumnIdDto = InferInput<typeof ColumnIdDtoSchema>
export type AddColumnDto = InferInput<typeof AddColumnDtoSchema>
export type EditColumnDto = InferInput<typeof EditColumnDtoSchema>
export type UpdateColumnDto = InferInput<typeof UpdateColumnDtoSchema>
