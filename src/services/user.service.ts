import type { EditUserSchema, HelpSchema } from 'lib/schemas'
import type { User } from 'types'

import { axiosWithAuth } from 'api'
import { ApiEndpoints } from 'config'

export const userService = {
  async changeUserTheme(theme: string) {
    const response = await axiosWithAuth.put<User>(ApiEndpoints.UserTheme, {
      theme
    })

    return response.data
  },

  async askForHelp(data: HelpSchema) {
    await axiosWithAuth.post(ApiEndpoints.UserHelp, data)
  },

  async updateUserCredentials(data: EditUserSchema) {
    const response = await axiosWithAuth.put<User>(ApiEndpoints.User, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    return response.data
  }
}
