import type { ColumnTitle, UpdateOrderData } from 'types'

import { axiosInstance } from 'api'
import { ApiEndpoints } from 'config'

export const columnService = {
  async addNewColumn(boardId: string, data: ColumnTitle) {
    await axiosInstance.post(ApiEndpoints.ColumnBoardById(boardId), data)
  },

  async editColumn(columnId: string, data: ColumnTitle) {
    await axiosInstance.put(ApiEndpoints.ColumnById(columnId), data)
  },

  async deleteColumn(columnId: string) {
    await axiosInstance.delete(ApiEndpoints.ColumnById(columnId))
  },

  async updateColumnsOrder(boardId: string, data: UpdateOrderData) {
    await axiosInstance.patch(ApiEndpoints.ColumnOrder(boardId), data)
  }
}
