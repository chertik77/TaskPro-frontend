import type { AddBoardDto, BoardIdDto, EditBoardDto } from './types'

import { axiosInstance, axiosValidators } from '@/shared/lib/axios'

import {
  AddBoardDtoSchema,
  BoardDtoSchema,
  BoardIdDtoSchema,
  BoardsDtoSchema,
  EditBoardDtoSchema
} from './contracts'
import { BoardApiEndpoints } from './endpoints'

export const boardService = {
  async getAllBoards() {
    const response = await axiosInstance.get(BoardApiEndpoints.Board)

    const validatedResponse = axiosValidators.validateResponse(
      BoardsDtoSchema,
      response
    )

    return validatedResponse.data
  },

  async getBoardById(data: BoardIdDto) {
    const { boardId } = axiosValidators.validateRequest(BoardIdDtoSchema, data)

    const response = await axiosInstance.get(
      BoardApiEndpoints.BoardById(boardId)
    )

    const validatedResponse = axiosValidators.validateResponse(
      BoardDtoSchema,
      response
    )

    return validatedResponse.data
  },

  async addNewBoard(data: AddBoardDto) {
    const addBoardDto = axiosValidators.validateRequest(AddBoardDtoSchema, data)

    const response = await axiosInstance.post(
      BoardApiEndpoints.Board,
      addBoardDto
    )

    const validatedResponse = axiosValidators.validateResponse(
      BoardDtoSchema,
      response
    )

    return validatedResponse.data
  },

  async editBoard(data: EditBoardDto) {
    const { boardId, ...editBoardDto } = axiosValidators.validateRequest(
      EditBoardDtoSchema,
      data
    )

    const response = await axiosInstance.put(
      BoardApiEndpoints.BoardById(boardId),
      editBoardDto
    )

    const validatedResponse = axiosValidators.validateResponse(
      BoardDtoSchema,
      response
    )

    return validatedResponse.data
  },

  async deleteBoard(data: BoardIdDto) {
    const { boardId } = axiosValidators.validateRequest(BoardIdDtoSchema, data)

    await axiosInstance.delete(BoardApiEndpoints.BoardById(boardId))
  }
}
