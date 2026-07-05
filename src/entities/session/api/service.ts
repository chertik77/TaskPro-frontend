import type { SigninDto, SignupDto } from './types'

import { parse } from 'valibot'

import { authClient } from '@/shared/api/auth-client'
import { env } from '@/shared/config'

import {
  SessionResponseDtoSchema,
  SigninDtoSchema,
  SignupDtoSchema
} from './contracts'

export const sessionService = {
  async signup(data: SignupDto) {
    const signupDto = parse(SignupDtoSchema, data)

    const response = await authClient.signUp.email({
      ...signupDto,
      theme: 'light'
    })

    const parsedData = parse(SessionResponseDtoSchema, response)

    return parsedData
  },

  async signin(data: SigninDto) {
    const signinDto = parse(SigninDtoSchema, data)

    const response = await authClient.signIn.email(signinDto)

    const parsedData = parse(SessionResponseDtoSchema, response)

    return parsedData
  },

  async continueWithSocial(provider: 'google' | 'microsoft') {
    await authClient.signIn.social({
      provider,
      callbackURL: env.VITE_BASE_URL,
      errorCallbackURL: env.VITE_BASE_URL + '?error=oauth_error'
    })
  },

  async logout() {
    await authClient.signOut()
  }
}
