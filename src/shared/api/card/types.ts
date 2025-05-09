import type { InferInput } from 'valibot'
import type {
  AddCardDtoSchema,
  CardDtoSchema,
  CardIdDtoSchema,
  EditCardDtoSchema,
  UpdateCardOrderDtoSchema
} from './contracts'

export type CardDto = InferInput<typeof CardDtoSchema>
export type CardIdDto = InferInput<typeof CardIdDtoSchema>
export type AddCardDto = InferInput<typeof AddCardDtoSchema>
export type EditCardDto = InferInput<typeof EditCardDtoSchema>
export type UpdateCardOrderDto = InferInput<typeof UpdateCardOrderDtoSchema>
