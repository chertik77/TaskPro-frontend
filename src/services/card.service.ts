import type { CardSchema } from 'lib/schemas'

import { axiosWithAuth } from 'api'
import { ApiEndpoints } from 'config'

export const cardService = {
  async addNewCard(columnId: string, data: CardSchema) {
    await axiosWithAuth.post(`${ApiEndpoints.Card}/${columnId}`, data)
  },

  async changeCardColumn(cardId: string, newColumnId: string) {
    await axiosWithAuth.patch(`${ApiEndpoints.Card}/${cardId}/${newColumnId}`)
  },

  async editCard(cardId: string, data: CardSchema) {
    await axiosWithAuth.put(`${ApiEndpoints.Card}/${cardId}`, data)
  },

  async deleteCard(cardId: string) {
    await axiosWithAuth.delete(`${ApiEndpoints.Card}/${cardId}`)
  }
}
