import type { TitleSchema } from '../shared/schema'
import type { UpdateOrderData } from '../shared/types'

import { axiosInstance } from 'api'

import { ColumnApiEndpoints } from './config'

export const columnService = {
  async addNewColumn(boardId: string, data: TitleSchema) {
    await axiosInstance.post(ColumnApiEndpoints.ColumnBoardById(boardId), data)
  },

  async editColumn(columnId: string, data: TitleSchema) {
    await axiosInstance.put(ColumnApiEndpoints.ColumnById(columnId), data)
  },

  async deleteColumn(columnId: string) {
    await axiosInstance.delete(ColumnApiEndpoints.ColumnById(columnId))
  },

  async updateColumnsOrder(boardId: string, data: UpdateOrderData) {
    await axiosInstance.patch(ColumnApiEndpoints.ColumnOrder(boardId), data)
  }
}
