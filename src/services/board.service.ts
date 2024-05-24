import type { BoardSchema } from 'lib/schemas'
import type { Board } from 'types'

import { axiosWithAuth } from 'api'
import { API_ENDPOINTS } from 'config'

class BoardService {
  async getAllBoards() {
    const response = await axiosWithAuth.get<{ boards: Board[] }>(
      API_ENDPOINTS.BOARD
    )

    return response.data.boards
  }

  async getBoardById(boardId: string) {
    const response = await axiosWithAuth.get<Board>(
      `${API_ENDPOINTS.BOARD}/${boardId}`
    )

    return response.data
  }

  async addNewBoard(data: BoardSchema) {
    const response = await axiosWithAuth.post(
      `${API_ENDPOINTS.BOARD}/add`,
      data
    )

    return response.data
  }

  async editBoard(boardId: string, data: BoardSchema) {
    const response = await axiosWithAuth.put(
      `${API_ENDPOINTS.BOARD}/${boardId}`,
      data
    )

    return response.data
  }

  async deleteBoard(boardId: string) {
    const response = await axiosWithAuth.delete(
      `${API_ENDPOINTS.BOARD}/${boardId}`
    )

    return response.data
  }
}

export const boardService = new BoardService()
