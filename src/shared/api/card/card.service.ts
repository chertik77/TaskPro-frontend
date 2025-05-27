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
    const moveCardDto = parse(MoveCardDtoSchema, data)

    await axiosInstance.post(
      CardApiEndpoints.CardNewColumn(
        moveCardDto.cardId,
        moveCardDto.newColumnId
      )
    )
  },

  async deleteCard(data: CardIdDto) {
    const { cardId } = parse(EditCardDtoSchema, data)

    await axiosInstance.delete(CardApiEndpoints.CardById(cardId))
  }
}
