import type { InferOutput } from 'valibot'
import type {
  AddCardDtoSchema,
  CardDtoSchema,
  CardIdDtoSchema,
  EditCardDtoSchema,
  MoveCardDtoSchema,
  UpdateCardOrderDtoSchema
} from './card.contracts'

export type CardDto = InferOutput<typeof CardDtoSchema>
export type CardIdDto = InferOutput<typeof CardIdDtoSchema>
export type AddCardDto = InferOutput<typeof AddCardDtoSchema>
export type EditCardDto = InferOutput<typeof EditCardDtoSchema>
export type MoveCardDto = InferOutput<typeof MoveCardDtoSchema>
export type UpdateCardOrderDto = InferOutput<typeof UpdateCardOrderDtoSchema>
