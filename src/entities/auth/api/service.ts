import type {
  AuthResponse,
  SigninSchema,
  SignupSchema,
  Tokens
} from '../model/types'

import { axiosInstance } from '@/shared/lib/axios'

import { AuthApiEndpoints } from './endpoints'

export const authService = {
  async signup(data: SignupSchema) {
    const response = await axiosInstance.post<AuthResponse>(
      AuthApiEndpoints.Signup,
      data
    )

    return response.data
  },

  async signin(data: SigninSchema) {
    const response = await axiosInstance.post<AuthResponse>(
      AuthApiEndpoints.Signin,
      data,
      { skipAuthRefresh: true }
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

  async getTokens(refreshToken: string) {
    const response = await axiosInstance.post<Tokens>(AuthApiEndpoints.Tokens, {
      refreshToken
    })

    return response.data
  },

  async logout() {
    await axiosInstance.post(AuthApiEndpoints.Logout)
  }
}
