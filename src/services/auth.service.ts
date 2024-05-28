import type { SigninSchema, SignupSchema } from 'lib/schemas'
import type { AuthResponse } from 'types'

import { axiosClassic, axiosWithAuth } from 'api'
import { ApiEndpoints } from 'config'

export const authService = {
  async signup(data: SignupSchema) {
    const response = await axiosClassic.post<AuthResponse>(
      ApiEndpoints.Signup,
      data
    )

    return response.data
  },

  async signin(data: SigninSchema) {
    const response = await axiosClassic.post<AuthResponse>(
      ApiEndpoints.Signin,
      data
    )

    return response.data
  },

  async getTokens(data: { refreshToken: string }) {
    const response = await axiosClassic.post(ApiEndpoints.Tokens, data)

    return response.data
  },

  async logout() {
    const response = await axiosWithAuth.post(ApiEndpoints.Logout)

    return response.data
  }
}
