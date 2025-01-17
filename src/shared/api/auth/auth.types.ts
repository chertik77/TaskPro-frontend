import type { UserTypes } from 'api/user'
import type { InferInput } from 'valibot'
import type { SigninSchema, SignupSchema } from './auth.contracts'

export type AuthResponse = {
  refreshToken: string
  accessToken: string
  user: UserTypes.User
}

export type Tokens = Omit<AuthResponse, 'user'>

export type SigninSchema = InferInput<typeof SigninSchema>
export type SignupSchema = InferInput<typeof SignupSchema>
