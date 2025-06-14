import type {
  AddColumnDto,
  ColumnIdDto,
  EditColumnDto,
  UpdateColumnDto
} from './types'

import { parse } from 'valibot'

import { axiosInstance } from '@/shared/api'

import {
  AddColumnDtoSchema,
  ColumnIdDtoSchema,
  EditColumnDtoSchema,
  UpdateColumnDtoSchema
} from './contracts'
import { columnApiEndpoints } from './endpoints'

export const columnService = {
  async addColumn(data: AddColumnDto) {
    const { boardId, ...addColumnDto } = parse(AddColumnDtoSchema, data)

    await axiosInstance.post(
      columnApiEndpoints.boardById(boardId),
      addColumnDto
    )
  },

  async editColumn(data: EditColumnDto) {
    const { columnId, ...editColumnDto } = parse(EditColumnDtoSchema, data)

    await axiosInstance.patch(columnApiEndpoints.byId(columnId), editColumnDto)
  },

  async deleteColumn(data: ColumnIdDto) {
    const { columnId } = parse(ColumnIdDtoSchema, data)

    await axiosInstance.delete(columnApiEndpoints.byId(columnId))
  },

  async updateColumnOrder(data: UpdateColumnDto) {
    const { boardId, ...updateColumnDto } = parse(UpdateColumnDtoSchema, data)

    await axiosInstance.patch(
      columnApiEndpoints.order(boardId),
      updateColumnDto
    )
  }
}
