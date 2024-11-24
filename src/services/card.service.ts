import type { CardSchema } from 'lib/schemas'

import { axiosInstance } from 'api'
import { ApiEndpoints } from 'config'

export const cardService = {
  async addNewCard(columnId: string, data: CardSchema) {
    await axiosInstance.post(`${ApiEndpoints.Card}/${columnId}`, data)
  },

  async editCard(cardId: string, data: CardSchema) {
    await axiosInstance.put(`${ApiEndpoints.Card}/${cardId}`, data)
  },

  async deleteCard(cardId: string) {
    await axiosInstance.delete(`${ApiEndpoints.Card}/${cardId}`)
  },

  async updateCardsOrder(columnId: string, data: { ids: string[] }) {
    await axiosInstance.patch(`${ApiEndpoints.Card}/${columnId}/order`, data)
  }
}
