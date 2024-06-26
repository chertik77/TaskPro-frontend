import type { ColumnTitle } from 'types'

import { axiosInstance } from 'api'
import { ApiEndpoints } from 'config'

export const columnService = {
  async addNewColumn(boardId: string, data: ColumnTitle) {
    await axiosInstance.post(`${ApiEndpoints.Column}/${boardId}`, data)
  },

  async editColumn(columnId: string, data: ColumnTitle) {
    await axiosInstance.put(`${ApiEndpoints.Column}/${columnId}`, data)
  },

  async deleteColumn(columnId: string) {
    await axiosInstance.delete(`${ApiEndpoints.Column}/${columnId}`)
  }
}
