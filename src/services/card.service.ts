import type { CardSchemaFields } from 'lib/schemas'

import { axiosWithAuth } from 'api'
import { API_ENDPOINTS } from 'config'

class CardService {
  async addNewCard(boardId: string, columnId: string, data: CardSchemaFields) {
    const response = await axiosWithAuth.post(
      `${API_ENDPOINTS.DASHBOARD}/${boardId}/${columnId}`,
      data
    )

    return response.data
  }

  async changeCardColumn(
    boardId: string,
    columnId: string,
    cardId: string,
    newColumnId: string
  ) {
    const response = await axiosWithAuth.patch(
      `${API_ENDPOINTS.DASHBOARD}/${boardId}/${columnId}/${cardId}/${newColumnId}`
    )

    return response.data
  }

  async editCard(
    boardId: string,
    columnId: string,
    cardId: string,
    data: CardSchemaFields
  ) {
    const response = await axiosWithAuth.patch(
      `${API_ENDPOINTS.DASHBOARD}/${boardId}/${columnId}/${cardId}`,
      data
    )

    return response.data
  }

  async deleteCard(boardId: string, columnId: string, cardId: string) {
    const response = await axiosWithAuth.delete(
      `/dashboard/${boardId}/${columnId}/${cardId}`
    )

    return response.data
  }
}

export const cardService = new CardService()
