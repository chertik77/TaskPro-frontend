import type { InferInput } from 'valibot'
import type {
  AddBoardDtoSchema,
  BoardDtoSchema,
  BoardIdDtoSchema,
  BoardsDtoSchema,
  EditBoardDtoSchema
} from './contracts'

export type BoardDto = InferInput<typeof BoardDtoSchema>
export type BoardsDto = InferInput<typeof BoardsDtoSchema>
export type BoardIdDto = InferInput<typeof BoardIdDtoSchema>
export type AddBoardDto = InferInput<typeof AddBoardDtoSchema>
export type EditBoardDto = InferInput<typeof EditBoardDtoSchema>
