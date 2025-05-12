import type {
  AddCardDto,
  CardIdDto,
  EditCardDto,
  UpdateCardOrderDto
} from './card.types'

import { parse } from 'valibot'

import { axiosInstance } from '@/shared/lib/axios'

import {
  AddCardDtoSchema,
  EditCardDtoSchema,
  UpdateCardOrderDtoSchema
} from './card.contracts'
import { CardApiEndpoints } from './card.endpoints'

export const cardService = {
  async addCard(data: AddCardDto) {
    const { columnId, ...addCardDto } = parse(AddCardDtoSchema, data)

    await axiosInstance.post(
      CardApiEndpoints.CardColumnById(columnId),
      addCardDto
    )
  },

  async editCard(data: EditCardDto) {
    const { cardId, ...editCardDto } = parse(EditCardDtoSchema, data)

    await axiosInstance.put(CardApiEndpoints.CardById(cardId), editCardDto)
  },

  async deleteCard(data: CardIdDto) {
    const { cardId } = parse(EditCardDtoSchema, data)

    await axiosInstance.delete(CardApiEndpoints.CardById(cardId))
  },

  async updateCardOrder(data: UpdateCardOrderDto) {
    const { columnId, ...updateCardOrderDto } = parse(
      UpdateCardOrderDtoSchema,
      data
    )

    await axiosInstance.patch(
      CardApiEndpoints.CardOrder(columnId),
      updateCardOrderDto
    )
  }
}
