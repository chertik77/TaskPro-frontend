import type { BoardSchema } from 'lib/schemas'
import type { Board } from 'types'

import { axiosInstance } from 'api'
import { ApiEndpoints } from 'config'

export const boardService = {
  async getAllBoards() {
    const response = await axiosInstance.get<{ boards: Board[] }>(
      ApiEndpoints.Board
    )

    return response.data.boards
  },

  async getBoardById(boardId: string) {
    const response = await axiosInstance.get<Board>(
      `${ApiEndpoints.Board}/${boardId}`
    )

    return response.data
  },

  async addNewBoard(data: BoardSchema) {
    const response = await axiosInstance.post<Board>(
      `${ApiEndpoints.Board}`,
      data
    )

    return response.data
  },

  async editBoard(boardId: string, data: BoardSchema) {
    const response = await axiosInstance.put<Board>(
      `${ApiEndpoints.Board}/${boardId}`,
      data
    )

    return response.data
  },

  async deleteBoard(boardId: string) {
    await axiosInstance.delete(`${ApiEndpoints.Board}/${boardId}`)
  }
}
