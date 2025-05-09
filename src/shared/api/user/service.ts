import type { EditUserDto, HelpDto, ThemeDto } from './types'

import { axiosInstance, axiosValidators } from '@/shared/lib/axios'

import {
  EditUserDtoSchema,
  HelpDtoSchema,
  ThemeDtoSchema,
  UserDtoSchema
} from './contracts'
import { UserApiEndpoints } from './endpoints'

export const userService = {
  async changeUserTheme(data: ThemeDto) {
    const themeDto = axiosValidators.validateRequest(ThemeDtoSchema, data)

    const response = await axiosInstance.put(
      UserApiEndpoints.UserTheme,
      themeDto
    )

    const validatedResponse = axiosValidators.validateResponse(
      UserDtoSchema,
      response
    )

    return validatedResponse.data
  },

  async askForHelp(data: HelpDto) {
    const helpDto = axiosValidators.validateRequest(HelpDtoSchema, data)

    await axiosInstance.post(UserApiEndpoints.UserHelp, helpDto)
  },

  async updateUserCredentials(data: EditUserDto) {
    const editUserDto = axiosValidators.validateRequest(EditUserDtoSchema, data)

    const response = await axiosInstance.put(
      UserApiEndpoints.User,
      editUserDto,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )

    const validatedResponse = axiosValidators.validateResponse(
      UserDtoSchema,
      response
    )

    return validatedResponse.data
  },

  async getCurrentUser() {
    const response = await axiosInstance.get(UserApiEndpoints.UserMe)

    const validatedResponse = axiosValidators.validateResponse(
      UserDtoSchema,
      response
    )

    return validatedResponse.data
  }
}
