import type {
  GoogleSigninDto,
  RefreshTokenDto,
  SigninDto,
  SignupDto
} from './types'

import { parse } from 'valibot'

import { axiosInstance } from '@/shared/lib/axios'

import {
  AuthResponseDtoSchema,
  GoogleSigninDtoSchema,
  RefreshTokenDtoSchema,
  SigninDtoSchema,
  SignupDtoSchema,
  TokensDtoSchema
} from './contracts'
import { AuthApiEndpoints } from './endpoints'

export const authService = {
  async signup(data: SignupDto) {
    const signupDto = parse(SignupDtoSchema, data)

    const response = await axiosInstance.post(
      AuthApiEndpoints.Signup,
      signupDto
    )

    const parsedData = parse(AuthResponseDtoSchema, response.data)

    return parsedData
  },

  async signin(data: SigninDto) {
    const signinDto = parse(SigninDtoSchema, data)

    const response = await axiosInstance.post(
      AuthApiEndpoints.Signin,
      signinDto,
      { skipAuthRefresh: true }
    )

    const parsedData = parse(AuthResponseDtoSchema, response.data)

    return parsedData
  },

  async signinWithGoogle(data: GoogleSigninDto) {
    const googleSigninDto = parse(GoogleSigninDtoSchema, data)

    const response = await axiosInstance.post(
      AuthApiEndpoints.Google,
      googleSigninDto
    )

    const parsedData = parse(AuthResponseDtoSchema, response.data)

    return parsedData
  },

  async getTokens(data: RefreshTokenDto) {
    const refreshTokenDto = parse(RefreshTokenDtoSchema, data)

    const response = await axiosInstance.post(
      AuthApiEndpoints.Tokens,
      refreshTokenDto
    )

    const parsedData = parse(TokensDtoSchema, response.data)

    return parsedData
  },

  async logout() {
    await axiosInstance.post(AuthApiEndpoints.Logout)
  }
}
