import { axiosWithAuth } from 'api'
import { API_ENDPOINTS } from 'config/api-endpoints.config'

class ColumnService {
  async addNewColumn(boardId: string, data: { title: string }) {
    const response = await axiosWithAuth.post(
      `${API_ENDPOINTS.DASHBOARD}/${boardId}`,
      data
    )

    return response.data
  }

  async deleteColumn(boardId: string, columnId: string) {
    const response = await axiosWithAuth.delete(
      `${API_ENDPOINTS.DASHBOARD}/${boardId}/${columnId}`
    )

    return response.data
  }
}

export const columnService = new ColumnService()
