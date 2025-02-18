import type { UpdateOrderData } from '@/shared/types'
import type { CardSchema } from '../model/types'

import { axiosInstance } from '@/entities/auth/@x/card'

import { CardApiEndpoints } from './endpoints'

export const cardService = {
  async addNewCard(columnId: string, data: CardSchema) {
    await axiosInstance.post(CardApiEndpoints.CardColumnById(columnId), data)
  },

  async editCard(cardId: string, data: CardSchema) {
    await axiosInstance.put(CardApiEndpoints.CardById(cardId), data)
  },

  async deleteCard(cardId: string) {
    await axiosInstance.delete(CardApiEndpoints.CardById(cardId))
  },

  async updateCardsOrder(columnId: string, data: UpdateOrderData) {
    await axiosInstance.patch(CardApiEndpoints.CardOrder(columnId), data)
  }
}
