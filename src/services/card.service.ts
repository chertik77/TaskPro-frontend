import type { CardSchema } from 'lib/schemas'

import { axiosWithAuth } from 'api'
import { ApiEndpoints } from 'config'

export const cardService = {
  async addNewCard(columnId: string, data: CardSchema) {
    const response = await axiosWithAuth.post(
      `${ApiEndpoints.Card}/${columnId}`,
      data
    )

    return response.data
  },

  async changeCardColumn(cardId: string, newColumnId: string) {
    const response = await axiosWithAuth.patch(
      `${ApiEndpoints.Card}/${cardId}/${newColumnId}`
    )

    return response.data
  },

  async editCard(cardId: string, data: CardSchema) {
    const response = await axiosWithAuth.put(
      `${ApiEndpoints.Card}/${cardId}`,
      data
    )

    return response.data
  },

  async deleteCard(cardId: string) {
    const response = await axiosWithAuth.delete(
      `${ApiEndpoints.Card}/${cardId}`
    )

    return response.data
  }
}
