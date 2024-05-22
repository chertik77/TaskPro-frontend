import type { HelpSchema, PartialSignupSchema } from 'lib/schemas'
import type { AuthResponse } from 'types'

import { axiosWithAuth } from 'api'
import { API_ENDPOINTS } from 'config'

class UserService {
  async changeUserTheme(theme: string) {
    const response = await axiosWithAuth.patch<AuthResponse>(
      API_ENDPOINTS.USER_THEME,
      { userTheme: theme }
    )

    return response.data
  }

  async askForHelp(data: HelpSchema) {
    const response = await axiosWithAuth.post(API_ENDPOINTS.USER_HELP, data)

    return response.data
  }

  async updateUserCredentials(data: PartialSignupSchema) {
    const response = await axiosWithAuth.patch(API_ENDPOINTS.USER, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    return response.data
  }
}

export const userService = new UserService()
