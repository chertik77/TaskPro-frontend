import type { SigninSchema, SignupSchema } from 'lib/schemas'
import type { AuthResponse } from 'types'

import { axiosInstance } from 'api'
import { ApiEndpoints } from 'config'

export const authService = {
  async signup(data: SignupSchema) {
    const response = await axiosInstance.post<AuthResponse>(
      ApiEndpoints.Signup,
      data
    )

    return response.data
  },

  async signin(data: SigninSchema) {
    const response = await axiosInstance.post<AuthResponse>(
      ApiEndpoints.Signin,
      data
    )

    return response.data
  },

  async getTokens(data: { refreshToken: string }) {
    const response = await axiosInstance.post<Pick<AuthResponse, 'tokens'>>(
      ApiEndpoints.Tokens,
      data
    )

    return response.data
  },

  async logout() {
    await axiosInstance.post(ApiEndpoints.Logout)
  }
}
