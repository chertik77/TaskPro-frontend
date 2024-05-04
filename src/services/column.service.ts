import { axiosWithAuth } from 'api'

class ColumnService {
  async addNewColumn(boardId: string, data: { title: string }) {
    const response = await axiosWithAuth.post(`/dashboard/${boardId}`, data)

    return response.data
  }

  async deleteColumn(boardId: string, columnId: string) {
    const response = await axiosWithAuth.delete(
      `/dashboard/${boardId}/${columnId}`
    )

    return response.data
  }
}

export const columnService = new ColumnService()
