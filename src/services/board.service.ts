import type { BoardSchemaFields } from 'lib/schemas'
import type { Board } from 'types/board.types'

import { axiosWithAuth } from 'api'
import { API_ENDPOINTS } from 'config/api-endpoints.config'

class BoardService {
  async getAllBoards() {
    const response = await axiosWithAuth.get<{ total: number; data: Board[] }>(
      API_ENDPOINTS.DASHBOARD
    )

    return response.data.data
  }

  async getBoardById(boardId: string) {
    const response = await axiosWithAuth.get<Board>(
      `${API_ENDPOINTS.DASHBOARD}/${boardId}`
    )

    return response.data
  }

  async addNewBoard(data: BoardSchemaFields) {
    const response = await axiosWithAuth.post(API_ENDPOINTS.DASHBOARD, data)

    return response.data
  }

  async editBoard(boardId: string, data: BoardSchemaFields) {
    const response = await axiosWithAuth.patch(
      `${API_ENDPOINTS.DASHBOARD}/${boardId}`,
      data
    )

    return response.data
  }

  async deleteBoard(boardId: string) {
    const response = await axiosWithAuth.delete(
      `${API_ENDPOINTS.DASHBOARD}/${boardId}`
    )

    return response.data
  }
}

export const boardService = new BoardService()
