import type { EditUserSchema, HelpSchema } from 'lib/schemas'
import type { User } from 'types'

import { axiosWithAuth } from 'api'
import { API_ENDPOINTS } from 'config'

class UserService {
  async changeUserTheme(theme: string) {
    const response = await axiosWithAuth.put<User>(API_ENDPOINTS.USER_THEME, {
      theme
    })

    return response.data
  }

  async askForHelp(data: HelpSchema) {
    const response = await axiosWithAuth.post(API_ENDPOINTS.USER_HELP, data)

    return response.data
  }

  async updateUserCredentials(data: EditUserSchema) {
    const response = await axiosWithAuth.put(API_ENDPOINTS.USER, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    return response.data
  }
}

export const userService = new UserService()
