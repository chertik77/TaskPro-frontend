import type { NeedHelpSchemaFields } from 'lib/schemas'
import type { AuthResponse } from 'types/auth.types'

import { axiosWithAuth } from 'api'
import { API_ENDPOINTS } from 'config/api-endpoints.config'

class UserService {
  async changeUserTheme(theme: string) {
    const response = await axiosWithAuth.patch<AuthResponse>(
      API_ENDPOINTS.USER_THEME,
      { userTheme: theme }
    )

    return response.data
  }

  async askForHelp(data: NeedHelpSchemaFields) {
    const response = await axiosWithAuth.post(API_ENDPOINTS.USER_HELP, data)

    return response.data
  }
}

export const userService = new UserService()
