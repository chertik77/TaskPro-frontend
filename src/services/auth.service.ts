import type { SigninSchema, SignupSchema } from 'lib/schemas'
import type { AuthResponse, User } from 'types'

import { axiosClassic, axiosWithAuth } from 'api'
import { API_ENDPOINTS } from 'config'

class AuthService {
  async signup(data: SignupSchema) {
    const response = await axiosClassic.post<AuthResponse>(
      API_ENDPOINTS.SIGNUP,
      data
    )

    return response.data
  }

  async signin(data: SigninSchema) {
    const response = await axiosClassic.post<AuthResponse>(
      API_ENDPOINTS.SIGNIN,
      data
    )

    return response.data
  }

  async current() {
    const response = await axiosWithAuth.get<User>(API_ENDPOINTS.CURRENT)

    return response.data
  }

  async logout() {
    const response = await axiosWithAuth.post(API_ENDPOINTS.LOGOUT)

    return response.data
  }
}

export const authService = new AuthService()
