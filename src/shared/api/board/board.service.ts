import type { AddBoardDto, BoardIdDto, EditBoardDto } from './board.types'

import { parse } from 'valibot'

import { axiosInstance } from '@/shared/lib/axios'

import {
  AddBoardDtoSchema,
  BoardDtoSchema,
  BoardIdDtoSchema,
  BoardsDtoSchema,
  EditBoardDtoSchema
} from './board.contracts'
import { BoardApiEndpoints } from './board.endpoints'

export const boardService = {
  async getAllBoards() {
    const response = await axiosInstance.get(BoardApiEndpoints.Board)

    const parsedData = parse(BoardsDtoSchema, response.data)

    return parsedData
  },

  async getBoardById(data: BoardIdDto) {
    const { boardId } = parse(BoardIdDtoSchema, data)

    const response = await axiosInstance.get(
      BoardApiEndpoints.BoardById(boardId)
    )

    const parsedData = parse(BoardDtoSchema, response.data)

    return parsedData
  },

  async addNewBoard(data: AddBoardDto) {
    const addBoardDto = parse(AddBoardDtoSchema, data)

    const response = await axiosInstance.post(
      BoardApiEndpoints.Board,
      addBoardDto
    )

    const parsedData = parse(BoardDtoSchema, response.data)

    return parsedData
  },

  async editBoard(data: EditBoardDto) {
    const { boardId, ...editBoardDto } = parse(EditBoardDtoSchema, data)

    const response = await axiosInstance.put(
      BoardApiEndpoints.BoardById(boardId),
      editBoardDto
    )

    const parsedData = parse(BoardDtoSchema, response.data)

    return parsedData
  },

  async deleteBoard(data: BoardIdDto) {
    const { boardId } = parse(BoardIdDtoSchema, data)

    await axiosInstance.delete(BoardApiEndpoints.BoardById(boardId))
  }
}
