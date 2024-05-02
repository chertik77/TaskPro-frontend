import type { NeedHelpSchemaFields } from 'lib/schemas'
import type { AuthResponse } from 'types/auth.types'

import { axiosWithAuth } from 'api'

class UserService {
  async changeUserTheme(theme: string) {
    const response = await axiosWithAuth.patch<AuthResponse>(
      '/dashboard/theme',
      { userTheme: theme }
    )

    return response.data
  }

  async askForHelp(data: NeedHelpSchemaFields) {
    const response = await axiosWithAuth.post('/dashboard/help', data)

    return response.data
  }
}

export const userService = new UserService()
