import type { ColumnTitle } from 'types'

import { axiosWithAuth } from 'api'
import { ApiEndpoints } from 'config'

export const columnService = {
  async addNewColumn(boardId: string, data: ColumnTitle) {
    const response = await axiosWithAuth.post(
      `${ApiEndpoints.Column}/${boardId}`,
      data
    )

    return response.data
  },

  async editColumn(columnId: string, data: ColumnTitle) {
    const response = await axiosWithAuth.put(
      `${ApiEndpoints.Column}/${columnId}`,
      data
    )

    return response.data
  },

  async deleteColumn(columnId: string) {
    const response = await axiosWithAuth.delete(
      `${ApiEndpoints.Column}/${columnId}`
    )

    return response.data
  }
}
