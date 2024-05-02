import type { BoardSchemaFields } from 'lib/schemas'
import type { Board } from 'types/board.types'

import { axiosWithAuth } from 'api'

class BoardService {
  async getAllBoards() {
    const response = await axiosWithAuth.get<{ total: number; data: Board[] }>(
      '/dashboard'
    )

    return response.data.data
  }

  async addNewBoard(data: BoardSchemaFields) {
    const response = await axiosWithAuth.post('/dashboard', data)

    return response.data
  }

  async editBoard(boardId: string, data: BoardSchemaFields) {
    const response = await axiosWithAuth.patch(`/dashboard/${boardId}`, data)

    return response.data
  }

  async deleteBoard(boardId: string) {
    const response = await axiosWithAuth.delete(`/dashboard/${boardId}`)

    return response.data
  }
}

export const boardService = new BoardService()
