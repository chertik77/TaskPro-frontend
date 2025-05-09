import type {
  AddColumnDto,
  ColumnIdDto,
  EditColumnDto,
  UpdateColumnDto
} from './types'

import { axiosInstance, axiosValidators } from '@/shared/lib/axios'

import {
  AddColumnDtoSchema,
  ColumnIdDtoSchema,
  EditColumnDtoSchema,
  UpdateColumnDtoSchema
} from './contracts'
import { ColumnApiEndpoints } from './endpoints'

export const columnService = {
  async addNewColumn(data: AddColumnDto) {
    const { boardId, ...addColumnDto } = axiosValidators.validateRequest(
      AddColumnDtoSchema,
      data
    )

    await axiosInstance.post(
      ColumnApiEndpoints.ColumnBoardById(boardId),
      addColumnDto
    )
  },

  async editColumn(data: EditColumnDto) {
    const { columnId, ...editColumnDto } = axiosValidators.validateRequest(
      EditColumnDtoSchema,
      data
    )

    await axiosInstance.put(
      ColumnApiEndpoints.ColumnById(columnId),
      editColumnDto
    )
  },

  async deleteColumn(data: ColumnIdDto) {
    const { columnId } = axiosValidators.validateRequest(
      ColumnIdDtoSchema,
      data
    )

    await axiosInstance.delete(ColumnApiEndpoints.ColumnById(columnId))
  },

  async updateColumnOrder(data: UpdateColumnDto) {
    const { boardId, ...updateColumnDto } = axiosValidators.validateRequest(
      UpdateColumnDtoSchema,
      data
    )

    await axiosInstance.patch(
      ColumnApiEndpoints.ColumnOrder(boardId),
      updateColumnDto
    )
  }
}
