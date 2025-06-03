import type {
  AddColumnDto,
  ColumnIdDto,
  EditColumnDto,
  UpdateColumnDto
} from './column.types'

import { parse } from 'valibot'

import { axiosInstance } from '../instance'
import {
  AddColumnDtoSchema,
  ColumnIdDtoSchema,
  EditColumnDtoSchema,
  UpdateColumnDtoSchema
} from './column.contracts'
import { ColumnApiEndpoints } from './column.endpoints'

export const columnService = {
  async addColumn(data: AddColumnDto) {
    const { boardId, ...addColumnDto } = parse(AddColumnDtoSchema, data)

    await axiosInstance.post(
      ColumnApiEndpoints.ColumnBoardById(boardId),
      addColumnDto
    )
  },

  async editColumn(data: EditColumnDto) {
    const { columnId, ...editColumnDto } = parse(EditColumnDtoSchema, data)

    await axiosInstance.patch(
      ColumnApiEndpoints.ColumnById(columnId),
      editColumnDto
    )
  },

  async deleteColumn(data: ColumnIdDto) {
    const { columnId } = parse(ColumnIdDtoSchema, data)

    await axiosInstance.delete(ColumnApiEndpoints.ColumnById(columnId))
  },

  async updateColumnOrder(data: UpdateColumnDto) {
    const { boardId, ...updateColumnDto } = parse(UpdateColumnDtoSchema, data)

    await axiosInstance.patch(
      ColumnApiEndpoints.ColumnOrder(boardId),
      updateColumnDto
    )
  }
}
