import type { SigninSchemaFields, SignupSchemaFields } from 'lib/schemas'
import type { AuthResponse } from 'types/auth.types'

import { axiosClassic, axiosWithAuth } from 'api'

class AuthService {
  async signup(data: SignupSchemaFields) {
    const response = await axiosClassic.post<AuthResponse>('/auth/signup', data)

    return response.data
  }

  async signin(data: SigninSchemaFields) {
    const response = await axiosClassic.post<AuthResponse>('/auth/signin', data)

    return response.data
  }

  async logout() {
    const response = await axiosWithAuth.post('/auth/logout')

    return response.data
  }
}

export const authService = new AuthService()
