import type { CardSchema } from 'lib/schemas'

import { axiosWithAuth } from 'api'
import { API_ENDPOINTS } from 'config'

class CardService {
  async addNewCard(columnId: string, data: CardSchema) {
    const response = await axiosWithAuth.post(
      `${API_ENDPOINTS.CARD}/${columnId}/add-card`,
      data
    )

    return response.data
  }

  async changeCardColumn(
    columnId: string,
    cardId: string,
    newColumnId: string
  ) {
    const response = await axiosWithAuth.put(
      `${API_ENDPOINTS.CARD}/${columnId}/${cardId}/${newColumnId}`
    )

    return response.data
  }

  async editCard(cardId: string, data: CardSchema) {
    const response = await axiosWithAuth.put(
      `${API_ENDPOINTS.CARD}/${cardId}`,
      data
    )

    return response.data
  }

  async deleteCard(columnId: string, cardId: string) {
    const response = await axiosWithAuth.delete(
      `${API_ENDPOINTS.CARD}/${columnId}/${cardId}`
    )

    return response.data
  }
}

export const cardService = new CardService()
