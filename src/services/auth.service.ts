import type { SigninSchema, SignupSchema } from 'lib/schemas'
import type { AuthResponse } from 'types'

import { axiosInstance } from 'api'
import { ApiEndpoints } from 'config'

export const authService = {
  async signup(data: SignupSchema) {
    await axiosInstance.post(ApiEndpoints.Signup, data)
  },

  async signin(data: SigninSchema) {
    const response = await axiosInstance.post<AuthResponse>(
      ApiEndpoints.Signin,
      data
    )

    return response.data
  },

  async getTokens(data: { refreshToken: string }) {
    const response = await axiosInstance.post(ApiEndpoints.Tokens, data)

    return response.data
  },

  async logout() {
    await axiosInstance.post(ApiEndpoints.Logout)
  }
}
