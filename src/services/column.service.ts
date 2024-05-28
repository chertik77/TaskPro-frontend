import type { ColumnTitle } from 'types'

import { axiosWithAuth } from 'api'
import { ApiEndpoints } from 'config'

export const columnService = {
  async addNewColumn(boardId: string, data: ColumnTitle) {
    await axiosWithAuth.post(`${ApiEndpoints.Column}/${boardId}`, data)
  },

  async editColumn(columnId: string, data: ColumnTitle) {
    await axiosWithAuth.put(`${ApiEndpoints.Column}/${columnId}`, data)
  },

  async deleteColumn(columnId: string) {
    await axiosWithAuth.delete(`${ApiEndpoints.Column}/${columnId}`)
  }
}
