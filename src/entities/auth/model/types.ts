import type { User } from '@/entities/user/@x/auth'
import type { InferInput } from 'valibot'
import type { SigninSchema, SignupSchema } from '../api/contracts'

export type AuthResponse = {
  refreshToken: string
  accessToken: string
  user: User
}

export type Tokens = Omit<AuthResponse, 'user'>

export type SigninSchema = InferInput<typeof SigninSchema>
export type SignupSchema = InferInput<typeof SignupSchema>
