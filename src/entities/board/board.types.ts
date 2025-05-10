import type { InferOutput } from 'valibot'
import type {
  BoardSchema,
  BoardSchemaWithoutColumns,
  BoardsSchema,
  EditBoardModalSchema
} from './board.contracts'

export type BoardSchema = InferOutput<typeof BoardSchema>
export type BoardSchemaWithoutColumns = InferOutput<
  typeof BoardSchemaWithoutColumns
>
export type BoardsSchema = InferOutput<typeof BoardsSchema>
export type EditBoardModalSchema = InferOutput<typeof EditBoardModalSchema>
