import type {
  GoogleSigninDto,
  RefreshTokenDto,
  SigninDto,
  SignupDto
} from './auth.types'

import { parse } from 'valibot'

import { axiosInstance } from '../instance'
import {
  AuthResponseDtoSchema,
  GoogleSigninDtoSchema,
  RefreshTokenDtoSchema,
  SigninDtoSchema,
  SignupDtoSchema,
  TokensDtoSchema
} from './auth.contracts'
import { authApiEndpoints } from './auth.endpoints'

export const authService = {
  async signup(data: SignupDto) {
    const signupDto = parse(SignupDtoSchema, data)

    const response = await axiosInstance.post(
      authApiEndpoints.signup,
      signupDto
    )

    const parsedData = parse(AuthResponseDtoSchema, response.data)

    return parsedData
  },

  async signin(data: SigninDto) {
    const signinDto = parse(SigninDtoSchema, data)

    const response = await axiosInstance.post(
      authApiEndpoints.signin,
      signinDto,
      { skipAuthRefresh: true }
    )

    const parsedData = parse(AuthResponseDtoSchema, response.data)

    return parsedData
  },

  async signinWithGoogle(data: GoogleSigninDto) {
    const googleSigninDto = parse(GoogleSigninDtoSchema, data)

    const response = await axiosInstance.post(
      authApiEndpoints.google,
      googleSigninDto
    )

    const parsedData = parse(AuthResponseDtoSchema, response.data)

    return parsedData
  },

  async getTokens(data: RefreshTokenDto) {
    const refreshTokenDto = parse(RefreshTokenDtoSchema, data)

    const response = await axiosInstance.post(
      authApiEndpoints.tokens,
      refreshTokenDto
    )

    const parsedData = parse(TokensDtoSchema, response.data)

    return parsedData
  },

  async logout() {
    await axiosInstance.post(authApiEndpoints.logout)
  }
}
