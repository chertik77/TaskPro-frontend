import type { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh'
import type { SigninSchema, SignupSchema } from './auth.schema'
import type { AuthResponse, Tokens } from './auth.types'

import { axiosInstance } from 'api'

import { authTokenService } from './auth-token.service'
import { AuthApiEndpoints } from './config'

export const authService = {
  isSignedIn() {
    return !!authTokenService.getTokens()
  },

  async signup(data: SignupSchema) {
    const {
      data: { user, accessToken, refreshToken }
    } = await axiosInstance.post<AuthResponse>(AuthApiEndpoints.Signup, data)

    if (accessToken && refreshToken) {
      authTokenService.saveTokens({ accessToken, refreshToken })
    }

    return user
  },

  async signin(data: SigninSchema) {
    const requestConfig: AxiosAuthRefreshRequestConfig = {
      skipAuthRefresh: true
    }

    const {
      data: { user, accessToken, refreshToken }
    } = await axiosInstance.post<AuthResponse>(
      AuthApiEndpoints.Signin,
      data,
      requestConfig
    )

    if (accessToken && refreshToken) {
      authTokenService.saveTokens({ accessToken, refreshToken })
    }

    return user
  },

  async signinWithGoogle(code: string) {
    const {
      data: { user, accessToken, refreshToken }
    } = await axiosInstance.post<AuthResponse>(AuthApiEndpoints.Google, {
      code
    })

    if (accessToken && refreshToken) {
      authTokenService.saveTokens({ accessToken, refreshToken })
    }

    return user
  },

  async getTokens(data: { refreshToken: string }) {
    const {
      data: { accessToken, refreshToken }
    } = await axiosInstance.post<Tokens>(AuthApiEndpoints.Tokens, data)

    authTokenService.saveTokens({ accessToken, refreshToken })
  },

  async logout() {
    await axiosInstance.post(AuthApiEndpoints.Logout)

    authTokenService.removeTokens()
  }
}
