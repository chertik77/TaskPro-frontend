import type { InferOutput } from 'valibot'
import type {
  AddCardDtoSchema,
  CardDtoSchema,
  CardIdDtoSchema,
  EditCardDtoSchema,
  UpdateCardOrderDtoSchema
} from './contracts'

export type CardDto = InferOutput<typeof CardDtoSchema>
export type CardIdDto = InferOutput<typeof CardIdDtoSchema>
export type AddCardDto = InferOutput<typeof AddCardDtoSchema>
export type EditCardDto = InferOutput<typeof EditCardDtoSchema>
export type UpdateCardOrderDto = InferOutput<typeof UpdateCardOrderDtoSchema>
