import type { EditUserDto, HelpDto, ThemeDto } from './user.types'

import { parse } from 'valibot'

import { axiosInstance } from '@/shared/lib/axios'

import {
  EditUserDtoSchema,
  HelpDtoSchema,
  ThemeDtoSchema,
  UserDtoSchema
} from './user.contracts'
import { UserApiEndpoints } from './user.endpoints'

export const userService = {
  async changeUserTheme(data: ThemeDto) {
    const themeDto = parse(ThemeDtoSchema, data)

    const response = await axiosInstance.put(
      UserApiEndpoints.UserTheme,
      themeDto
    )

    const parsedData = parse(UserDtoSchema, response.data)

    return parsedData
  },

  async askForHelp(data: HelpDto) {
    const helpDto = parse(HelpDtoSchema, data)

    await axiosInstance.post(UserApiEndpoints.UserHelp, helpDto)
  },

  async updateUserCredentials(data: EditUserDto) {
    const editUserDto = parse(EditUserDtoSchema, data)

    const response = await axiosInstance.put(
      UserApiEndpoints.User,
      editUserDto,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )

    const parsedData = parse(UserDtoSchema, response.data)

    return parsedData
  },

  async getCurrentUser() {
    const response = await axiosInstance.get(UserApiEndpoints.UserMe)

    const parsedData = parse(UserDtoSchema, response.data)

    return parsedData
  }
}
