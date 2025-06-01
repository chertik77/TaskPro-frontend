import type {
  AddCardDto,
  CardIdDto,
  EditCardDto,
  MoveCardDto,
  UpdateCardOrderDto
} from './card.types'

import { parse } from 'valibot'

import { axiosInstance } from '@/shared/lib/axios'

import {
  AddCardDtoSchema,
  CardIdDtoSchema,
  EditCardDtoSchema,
  MoveCardDtoSchema,
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

    await axiosInstance.patch(CardApiEndpoints.CardById(cardId), editCardDto)
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
  },

  async moveCard(data: MoveCardDto) {
    const { cardId, newColumnId } = parse(MoveCardDtoSchema, data)

    await axiosInstance.post(
      CardApiEndpoints.CardNewColumn(cardId, newColumnId)
    )
  },

  async deleteCard(data: CardIdDto) {
    const { cardId } = parse(CardIdDtoSchema, data)

    await axiosInstance.delete(CardApiEndpoints.CardById(cardId))
  }
}
