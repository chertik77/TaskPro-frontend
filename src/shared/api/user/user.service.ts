import type { EditUserDto, HelpDto } from './user.types'

import { parse } from 'valibot'

import { axiosInstance } from '../instance'
import {
  EditUserDtoSchema,
  HelpDtoSchema,
  UserDtoSchema
} from './user.contracts'
import { userApiEndpoints } from './user.endpoints'

export const userService = {
  async askForHelp(data: HelpDto) {
    const helpDto = parse(HelpDtoSchema, data)

    await axiosInstance.post(userApiEndpoints.help, helpDto)
  },

  async editUser(data: EditUserDto) {
    const editUserDto = parse(EditUserDtoSchema, data)

    const response = await axiosInstance.patch(
      userApiEndpoints.root,
      editUserDto,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )

    const parsedData = parse(UserDtoSchema, response.data)

    return parsedData
  },

  async getCurrentUser() {
    const response = await axiosInstance.get(userApiEndpoints.me)

    const parsedData = parse(UserDtoSchema, response.data)

    return parsedData
  }
}
