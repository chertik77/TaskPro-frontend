import type { Board, BoardSchema } from './board.types'

import { axiosInstance } from '..'
import { BoardApiEndpoints } from './board.endpoints'

export const boardService = {
  async getAllBoards() {
    const response = await axiosInstance.get<Board[]>(BoardApiEndpoints.Board)

    return response.data
  },

  async getBoardById(boardId: string) {
    const response = await axiosInstance.get<Board>(
      BoardApiEndpoints.BoardById(boardId)
    )

    return response.data
  },

  async addNewBoard(data: BoardSchema) {
    const response = await axiosInstance.post<Board>(
      BoardApiEndpoints.Board,
      data
    )

    return response.data
  },

  async editBoard(boardId: string, data: BoardSchema) {
    const response = await axiosInstance.put<Board>(
      BoardApiEndpoints.BoardById(boardId),
      data
    )

    return response.data
  },

  async deleteBoard(boardId: string) {
    await axiosInstance.delete(BoardApiEndpoints.BoardById(boardId))
  }
}
