import type { CardSchema } from 'lib/schemas'

import { axiosInstance } from 'api'
import { ApiEndpoints } from 'config'

export const cardService = {
  async addNewCard(columnId: string, data: CardSchema) {
    await axiosInstance.post(`${ApiEndpoints.Card}/${columnId}`, data)
  },

  async changeCardColumn(cardId: string, newColumnId: string) {
    await axiosInstance.patch(`${ApiEndpoints.Card}/${cardId}/${newColumnId}`)
  },

  async editCard(cardId: string, data: CardSchema) {
    await axiosInstance.put(`${ApiEndpoints.Card}/${cardId}`, data)
  },

  async deleteCard(cardId: string) {
    await axiosInstance.delete(`${ApiEndpoints.Card}/${cardId}`)
  }
}
