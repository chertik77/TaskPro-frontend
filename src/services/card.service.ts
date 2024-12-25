import type { CardSchema } from 'lib/schemas'
import type { UpdateOrderData } from 'types'

import { axiosInstance } from 'api'
import { ApiEndpoints } from 'config'

export const cardService = {
  async addNewCard(columnId: string, data: CardSchema) {
    await axiosInstance.post(ApiEndpoints.CardColumnById(columnId), data)
  },

  async editCard(cardId: string, data: CardSchema) {
    await axiosInstance.put(ApiEndpoints.CardById(cardId), data)
  },

  async deleteCard(cardId: string) {
    await axiosInstance.delete(ApiEndpoints.CardById(cardId))
  },

  async updateCardsOrder(columnId: string, data: UpdateOrderData) {
    await axiosInstance.patch(ApiEndpoints.CardOrder(columnId), data)
  }
}
