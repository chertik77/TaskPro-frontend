import type { InferOutput } from 'valibot'
import type {
  AddBoardDtoSchema,
  BoardDtoSchema,
  BoardIdDtoSchema,
  BoardsDtoSchema,
  EditBoardDtoSchema
} from './contracts'

export type BoardDto = InferOutput<typeof BoardDtoSchema>
export type BoardsDto = InferOutput<typeof BoardsDtoSchema>
export type BoardIdDto = InferOutput<typeof BoardIdDtoSchema>
export type AddBoardDto = InferOutput<typeof AddBoardDtoSchema>
export type EditBoardDto = InferOutput<typeof EditBoardDtoSchema>
