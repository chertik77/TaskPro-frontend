import type { EditUserSchema, HelpSchema, User } from '../model/types'

import { axiosInstance } from '@/shared/lib/axios'

import { UserApiEndpoints } from './endpoints'

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
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )

    return response.data
  }
}
