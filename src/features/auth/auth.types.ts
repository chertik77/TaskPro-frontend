import type { User } from 'types'

export type AuthResponse = {
  refreshToken: string
  accessToken: string
  user: User
}

export type Tokens = Omit<AuthResponse, 'user'>
