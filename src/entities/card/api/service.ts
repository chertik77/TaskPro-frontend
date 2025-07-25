import type {
  AddCardDto,
  CardIdDto,
  EditCardDto,
  UpdateCardOrderDto
} from './types'

import { parse } from 'valibot'

import { axiosInstance } from '@/shared/api'

import {
  AddCardDtoSchema,
  CardIdDtoSchema,
  EditCardDtoSchema,
  UpdateCardOrderDtoSchema
} from './contracts'
import { cardApiEndpoints } from './endpoints'

export const cardService = {
  async addCard(data: AddCardDto) {
    const { columnId, ...addCardDto } = parse(AddCardDtoSchema, data)

    await axiosInstance.post(cardApiEndpoints.columnById(columnId), addCardDto)
  },

  async editCard(data: EditCardDto) {
    const { cardId, ...editCardDto } = parse(EditCardDtoSchema, data)

    await axiosInstance.patch(cardApiEndpoints.byId(cardId), editCardDto)
  },

  async updateCardOrder(data: UpdateCardOrderDto) {
    const { columnId, ...updateCardOrderDto } = parse(
      UpdateCardOrderDtoSchema,
      data
    )

    await axiosInstance.patch(
      cardApiEndpoints.order(columnId),
      updateCardOrderDto
    )
  },

  async deleteCard(data: CardIdDto) {
    const { cardId } = parse(CardIdDtoSchema, data)

    await axiosInstance.delete(cardApiEndpoints.byId(cardId))
  }
}
