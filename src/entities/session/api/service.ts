import type { SigninDto, SignupDto } from './types'

import { parse } from 'valibot'

import { axiosInstance } from '@/shared/api'

import {
  InitiateGoogleResponseDtoSchema,
  SessionResponseDtoSchema,
  SigninDtoSchema,
  SignupDtoSchema
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

  async initiateGoogleSignin() {
    const response = await axiosInstance.post(
      sessionApiEndpoints.googleInitiate
    )

    const parsedData = parse(InitiateGoogleResponseDtoSchema, response.data)

    return parsedData
  },

  async refreshTokens() {
    await axiosInstance.post(sessionApiEndpoints.refresh)
  },

  async logout() {
    await axiosInstance.post(sessionApiEndpoints.logout)
  }
}
