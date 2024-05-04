import type { CardSchemaFields } from 'lib/schemas'

import { axiosWithAuth } from 'api'

class CardService {
  async addNewCard(boardId: string, columnId: string, data: CardSchemaFields) {
    const response = await axiosWithAuth.post(
      `/dashboard/${boardId}/${columnId}`,
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
      `/dashboard/${boardId}/${columnId}/${cardId}/${newColumnId}`
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
      `/dashboard/${boardId}/${columnId}/${cardId}`,
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
