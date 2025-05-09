import type {
  AddCardDto,
  CardIdDto,
  EditCardDto,
  UpdateCardOrderDto
} from './types'

import { axiosInstance, axiosValidators } from '@/shared/lib/axios'

import {
  AddCardDtoSchema,
  EditCardDtoSchema,
  UpdateCardOrderDtoSchema
} from './contracts'
import { CardApiEndpoints } from './endpoints'

export const cardService = {
  async addNewCard(data: AddCardDto) {
    const { columnId, ...addCardDto } = axiosValidators.validateRequest(
      AddCardDtoSchema,
      data
    )

    await axiosInstance.post(
      CardApiEndpoints.CardColumnById(columnId),
      addCardDto
    )
  },

  async editCard(data: EditCardDto) {
    const { cardId, ...editCardDto } = axiosValidators.validateRequest(
      EditCardDtoSchema,
      data
    )

    await axiosInstance.put(CardApiEndpoints.CardById(cardId), editCardDto)
  },

  async deleteCard(data: CardIdDto) {
    const { cardId } = axiosValidators.validateRequest(EditCardDtoSchema, data)

    await axiosInstance.delete(CardApiEndpoints.CardById(cardId))
  },

  async updateCardOrder(data: UpdateCardOrderDto) {
    const { columnId, ...updateCardOrderDto } = axiosValidators.validateRequest(
      UpdateCardOrderDtoSchema,
      data
    )

    await axiosInstance.patch(
      CardApiEndpoints.CardOrder(columnId),
      updateCardOrderDto
    )
  }
}
