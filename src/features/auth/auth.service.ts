import type { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh'
import type { SigninSchema, SignupSchema } from 'lib/schemas'
import type { AuthResponse, Tokens } from './auth.types'

import { axiosInstance } from 'api'

import { AuthApiEndpoints } from './config'

export const authService = {
  async signup(data: SignupSchema) {
    const response = await axiosInstance.post<AuthResponse>(
      AuthApiEndpoints.Signup,
      data
    )

    return response.data
  },

  async signin(data: SigninSchema) {
    const requestConfig: AxiosAuthRefreshRequestConfig = {
      skipAuthRefresh: true
    }

    const response = await axiosInstance.post<AuthResponse>(
      AuthApiEndpoints.Signin,
      data,
      requestConfig
    )

    return response.data
  },

  async signinWithGoogle(code: string) {
    const response = await axiosInstance.post<AuthResponse>(
      AuthApiEndpoints.Google,
      { code }
    )

    return response.data
  },

  getTokens(data: { refreshToken: string }) {
    return axiosInstance.post<Tokens>(AuthApiEndpoints.Tokens, data)
  },

  async logout() {
    await axiosInstance.post(AuthApiEndpoints.Logout)
  }
}
