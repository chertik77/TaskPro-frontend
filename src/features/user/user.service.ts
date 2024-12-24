import type { EditUserSchema, HelpSchema } from './user.schema'
import type { User } from './user.types'

import { axiosInstance } from 'api'

import { UserApiEndpoints } from './config'

export const userService = {
  async changeUserTheme(theme: string) {
    const response = await axiosInstance.put<User>(UserApiEndpoints.UserTheme, {
      theme
    })

    return response.data
  },

  async askForHelp(data: HelpSchema) {
    await axiosInstance.post(UserApiEndpoints.UserHelp, data)
  },

  async updateUserCredentials(data: EditUserSchema) {
    const response = await axiosInstance.put<User>(
      UserApiEndpoints.User,
      data,
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    )

    return response.data
  },

  async getCurrentUser() {
    const response = await axiosInstance.get<User>(UserApiEndpoints.UserMe)

    return response.data
  }
}
