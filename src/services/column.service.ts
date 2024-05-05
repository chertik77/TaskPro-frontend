import type { ColumnSchemaFields } from 'lib/schemas'

import { axiosWithAuth } from 'api'
import { API_ENDPOINTS } from 'config'

class ColumnService {
  async addNewColumn(boardId: string, data: ColumnSchemaFields) {
    const response = await axiosWithAuth.post(
      `${API_ENDPOINTS.DASHBOARD}/${boardId}`,
      data
    )

    return response.data
  }

  async editColumn(
    boardId: string,
    columnId: string,
    data: ColumnSchemaFields
  ) {
    const response = await axiosWithAuth.patch(
      `${API_ENDPOINTS.DASHBOARD}/${boardId}/${columnId}`,
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
