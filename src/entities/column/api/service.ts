import type { UpdateOrderData } from '@/shared/types'
import type { ColumnSchema } from '../model/types'

import { axiosInstance } from '@/entities/auth/@x/column'

import { ColumnApiEndpoints } from './endpoints'

export const columnService = {
  async addNewColumn(boardId: string, data: ColumnSchema) {
    await axiosInstance.post(ColumnApiEndpoints.ColumnBoardById(boardId), data)
  },

  async editColumn(columnId: string, data: ColumnSchema) {
    await axiosInstance.put(ColumnApiEndpoints.ColumnById(columnId), data)
  },

  async deleteColumn(columnId: string) {
    await axiosInstance.delete(ColumnApiEndpoints.ColumnById(columnId))
  },

  async updateColumnOrder(boardId: string, data: UpdateOrderData) {
    await axiosInstance.patch(ColumnApiEndpoints.ColumnOrder(boardId), data)
  }
}
