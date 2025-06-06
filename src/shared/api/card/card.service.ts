import type {
  AddCardDto,
  CardIdDto,
  EditCardDto,
  MoveCardDto,
  UpdateCardOrderDto
} from './card.types'

import { parse } from 'valibot'

import { axiosInstance } from '../instance'
import {
  AddCardDtoSchema,
  CardIdDtoSchema,
  EditCardDtoSchema,
  MoveCardDtoSchema,
  UpdateCardOrderDtoSchema
} from './card.contracts'
import { cardApiEndpoints } from './card.endpoints'

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

  async moveCard(data: MoveCardDto) {
    const { cardId, newColumnId } = parse(MoveCardDtoSchema, data)

    await axiosInstance.post(cardApiEndpoints.newColumn(cardId, newColumnId))
  },

  async deleteCard(data: CardIdDto) {
    const { cardId } = parse(CardIdDtoSchema, data)

    await axiosInstance.delete(cardApiEndpoints.byId(cardId))
  }
}
