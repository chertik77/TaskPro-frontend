import type {
  GoogleSigninDto,
  RefreshTokenDto,
  SigninDto,
  SignupDto
} from './types'

import { parse } from 'valibot'

import { axiosInstance } from '@/shared/api'

import {
  GoogleSigninDtoSchema,
  RefreshTokenDtoSchema,
  SessionResponseDtoSchema,
  SigninDtoSchema,
  SignupDtoSchema,
  TokensDtoSchema
} from './contracts'
import { sessionApiEndpoints } from './endpoints'

export const sessionService = {
  async signup(data: SignupDto) {
    const signupDto = parse(SignupDtoSchema, data)

    const response = await axiosInstance.post(
      sessionApiEndpoints.signup,
      signupDto
    )

    const parsedData = parse(SessionResponseDtoSchema, response.data)

    return parsedData
  },

  async signin(data: SigninDto) {
    const signinDto = parse(SigninDtoSchema, data)

    const response = await axiosInstance.post(
      sessionApiEndpoints.signin,
      signinDto,
      { skipAuthRefresh: true }
    )

    const parsedData = parse(SessionResponseDtoSchema, response.data)

    return parsedData
  },

  async signinWithGoogle(data: GoogleSigninDto) {
    const googleSigninDto = parse(GoogleSigninDtoSchema, data)

    const response = await axiosInstance.post(
      sessionApiEndpoints.google,
      googleSigninDto
    )

    const parsedData = parse(SessionResponseDtoSchema, response.data)

    return parsedData
  },

  async getTokens(data: RefreshTokenDto) {
    const refreshTokenDto = parse(RefreshTokenDtoSchema, data)

    const response = await axiosInstance.post(
      sessionApiEndpoints.tokens,
      refreshTokenDto
    )

    const parsedData = parse(TokensDtoSchema, response.data)

    return parsedData
  },

  async logout() {
    await axiosInstance.post(sessionApiEndpoints.logout)
  }
}
