import type {
  GoogleSigninDto,
  RefreshTokenDto,
  SigninDto,
  SignupDto
} from './types'

import { axiosInstance, axiosValidators } from '@/shared/lib/axios'

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
    const signupDto = axiosValidators.validateRequest(SignupDtoSchema, data)

    const response = await axiosInstance.post(
      AuthApiEndpoints.Signup,
      signupDto
    )

    const validatedResponse = axiosValidators.validateResponse(
      AuthResponseDtoSchema,
      response
    )

    return validatedResponse.data
  },

  async signin(data: SigninDto) {
    const signinDto = axiosValidators.validateRequest(SigninDtoSchema, data)

    const response = await axiosInstance.post(
      AuthApiEndpoints.Signin,
      signinDto,
      { skipAuthRefresh: true }
    )

    const validatedResponse = axiosValidators.validateResponse(
      AuthResponseDtoSchema,
      response
    )

    return validatedResponse.data
  },

  async signinWithGoogle(data: GoogleSigninDto) {
    const googleSigninDto = axiosValidators.validateRequest(
      GoogleSigninDtoSchema,
      data
    )

    const response = await axiosInstance.post(
      AuthApiEndpoints.Google,
      googleSigninDto
    )

    const validatedResponse = axiosValidators.validateResponse(
      AuthResponseDtoSchema,
      response
    )

    return validatedResponse.data
  },

  async getTokens(data: RefreshTokenDto) {
    const refreshTokenDto = axiosValidators.validateRequest(
      RefreshTokenDtoSchema,
      data
    )

    const response = await axiosInstance.post(
      AuthApiEndpoints.Tokens,
      refreshTokenDto
    )

    const validatedResponse = axiosValidators.validateResponse(
      TokensDtoSchema,
      response
    )

    return validatedResponse.data
  },

  async logout() {
    await axiosInstance.post(AuthApiEndpoints.Logout)
  }
}
