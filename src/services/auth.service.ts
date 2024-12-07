import type { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh'
import type { SigninSchema, SignupSchema } from 'lib/schemas'
import type { AuthResponse, Tokens } from 'types'

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
    const requestConfig: AxiosAuthRefreshRequestConfig = {
      skipAuthRefresh: true
    }

    const response = await axiosInstance.post<AuthResponse>(
      ApiEndpoints.Signin,
      data,
      requestConfig
    )

    return response.data
  },

  async signinWithGoogle(code: string) {
    const response = await axiosInstance.post<AuthResponse>(
      ApiEndpoints.Google,
      { code }
    )

    return response.data
  },

  getTokens(data: { refreshToken: string }) {
    return axiosInstance.post<Tokens>(ApiEndpoints.Tokens, data)
  },

  async logout() {
    await axiosInstance.post(ApiEndpoints.Logout)
  }
}
