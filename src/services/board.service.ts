import type { BoardSchemaFields } from 'lib/schemas'

import { axiosWithAuth } from 'api'

class BoardService {
  async addNewBoard(data: BoardSchemaFields) {
    const response = await axiosWithAuth.post('/dashboard', data)

    return response.data
  }

  async editBoard(boardId: string, data: BoardSchemaFields) {
    const response = await axiosWithAuth.patch(`/dashboard/${boardId}`, data)

    return response.data
  }
}

export const boardService = new BoardService()
