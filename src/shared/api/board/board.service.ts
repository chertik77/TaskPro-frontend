import type { AddBoardDto, BoardIdDto, EditBoardDto } from './board.types'

import { parse } from 'valibot'

import { axiosInstance } from '../instance'
import {
  AddBoardDtoSchema,
  BoardDtoSchema,
  BoardIdDtoSchema,
  BoardsDtoSchema,
  EditBoardDtoSchema
} from './board.contracts'
import { boardApiEndpoints } from './board.endpoints'

export const boardService = {
  async getAllBoards() {
    const response = await axiosInstance.get(boardApiEndpoints.root)

    const parsedData = parse(BoardsDtoSchema, response.data)

    return parsedData
  },

  async getBoardById(data: BoardIdDto) {
    const { boardId } = parse(BoardIdDtoSchema, data)

    const response = await axiosInstance.get(boardApiEndpoints.byId(boardId))

    const parsedData = parse(BoardDtoSchema, response.data)

    return parsedData
  },

  async addBoard(data: AddBoardDto) {
    const addBoardDto = parse(AddBoardDtoSchema, data)

    const response = await axiosInstance.post(
      boardApiEndpoints.root,
      addBoardDto
    )

    const parsedData = parse(BoardDtoSchema, response.data)

    return parsedData
  },

  async editBoard(data: EditBoardDto) {
    const { boardId, ...editBoardDto } = parse(EditBoardDtoSchema, data)

    const response = await axiosInstance.patch(
      boardApiEndpoints.byId(boardId),
      editBoardDto
    )

    const parsedData = parse(BoardDtoSchema, response.data)

    return parsedData
  },

  async deleteBoard(data: BoardIdDto) {
    const { boardId } = parse(BoardIdDtoSchema, data)

    await axiosInstance.delete(boardApiEndpoints.byId(boardId))
  }
}
